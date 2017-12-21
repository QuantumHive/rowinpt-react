using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rowinpt.api.Constants;
using rowinpt.api.Core;
using rowinpt.api.Models;
using rowinpt.api.ViewModels;

namespace rowinpt.api
{
    [Route("api/users")]
    [Authorize(Roles = Roles.Admin)]
    public class UserController : Controller
    {
        private readonly RowinContext dbContext;
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole<int>> roleManager;
        private readonly IEmailService emailService;
        private readonly TelemetryClient telemetryClient;
        private readonly ICsvWriter csvWriter;

        public UserController(
            RowinContext dbContext,
            UserManager<User> userManager,
            IEmailService emailService, RoleManager<IdentityRole<int>> roleManager,
            ICsvWriter csvWriter)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
            this.emailService = emailService;
            this.roleManager = roleManager;
            this.csvWriter = csvWriter;
            telemetryClient = new TelemetryClient();
        }

        [HttpGet("maillist/download/{locationId}")]
        public IActionResult Download(int locationId)
        {
            var users =
                from user in dbContext.Users.Include(u => u.Roles).Include(u => u.UserSubscriptions)
                where user.EmailConfirmed
                join userRole in dbContext.UserRoles on user.Id equals userRole.UserId
                join role in dbContext.Roles on userRole.RoleId equals role.Id
                where role.Name == Roles.User
                select user;

            var threshold = DateTime.Today.AddDays(-14);

            var absentUsers =
                from user in users.Include(u => u.Schedules).ThenInclude(s => s.Timetable).ThenInclude(t => t.Course)
                where !user.Schedules.Any(s => s.Date > threshold)
                where user.Schedules.Any(s => s.Timetable.LocationId == locationId)
                let lastTime = (
                    from schedule in user.Schedules
                    where schedule.Timetable.LocationId == locationId
                    orderby schedule.Date descending
                    select schedule).FirstOrDefault()
                let userSubs =
                    from sub in user.UserSubscriptions
                    select sub.Subscription.CourseType.Name
                let typesPastTwoWeeks = (
                    from schedule in user.Schedules
                    where schedule.Timetable.LocationId == locationId
                    where schedule.Date > threshold
                    select schedule.Timetable.Course.CourseType.Name).Distinct()
                let courseTypes = userSubs.Except(typesPastTwoWeeks)
                select new
                {
                    Voornaam = user.FirstName,
                    Achternaam = user.LastName,
                    Telefoon = user.PhoneNumber,
                    user.Email,
                    LaatsteKeer = lastTime == null ? string.Empty : lastTime.Date.ToString("dd-MM-yyyy"),
                    Begeleidingsvormen = string.Join(", ", courseTypes)
                };

            var bytes = csvWriter.WriteRecords(absentUsers);
            return File(bytes, "text/csv", "afwezigen.csv");
        }

        [HttpGet("maillist")]
        public async Task<IEnumerable<UserViewModel>> MailList()
        {
            var users =
                from user in dbContext.Users.Include(u => u.Roles).Include(u => u.UserSubscriptions)
                where user.EmailConfirmed
                join userRole in dbContext.UserRoles on user.Id equals userRole.UserId
                join role in dbContext.Roles on userRole.RoleId equals role.Id
                where role.Name == Roles.User
                select user;

            var threshold = DateTime.Today.AddDays(-14);

            var absentUsers =
                from user in users.Include(u => u.Schedules)
                where !user.Schedules.Any(s => s.Date > threshold)
                select user;

            var result = await absentUsers.ToListAsync();
            return result.Select(UserViewModel.Map);
        }

        [HttpGet]
        public async Task<IEnumerable<UserViewModel>> Get()
        {
            var nonAdminUsers =
                from user in dbContext.Users.Include(u => u.Roles)
                join userRole in dbContext.UserRoles on user.Id equals userRole.UserId
                join role in dbContext.Roles on userRole.RoleId equals role.Id
                where role.Name != Roles.Admin
                select user;

            var users = await nonAdminUsers.Include(user => user.UserSubscriptions).ToListAsync();
            var mappedUsers = users.Select(UserViewModel.Map).ToList();
            foreach (var user in mappedUsers)
            {
                var role = await roleManager.FindByIdAsync(user.RoleId.ToString());
                user.Role = role.Name;
            }
            return mappedUsers;
        }

        [HttpPost]
        public async Task<IActionResult> New([FromBody]UserViewModel userViewModel)
        {
            var subscriptions = await dbContext.Subscriptions.Include(subscription => subscription.CourseType).ToListAsync();
            var user = userViewModel.MapToUserEntity(subscriptions);

            var result = await userManager.CreateAsync(user);
            if (result == IdentityResult.Success)
            {
                await userManager.AddToRoleAsync(user, Roles.User);

                await SendActivationMail(userViewModel.Email, user);

                return CreatedAtRoute("GetUser", new { id = user.Id }, UserViewModel.Map(user));
            }

            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UserViewModel userViewModel)
        {
            var destination = await dbContext.Users
                .Include(u => u.UserSubscriptions)
                .Include(u => u.UserCourseTypes)
                .SingleOrDefaultAsync(u => u.Id == userViewModel.Id);

            if (destination == null) return NotFound();

            var subscriptions = await dbContext.Subscriptions.Include(subscription => subscription.CourseType).ToListAsync();
            var source = userViewModel.MapToUserEntity(subscriptions);

            destination.FirstName = source.FirstName;
            destination.LastName = source.LastName;
            destination.PhoneNumber = source.PhoneNumber;
            destination.Birthdate = source.Birthdate;
            destination.CustomerId = source.CustomerId;

            destination.UserSubscriptions.Clear();
            destination.UserCourseTypes.Clear();
            dbContext.Users.Update(destination);
            await dbContext.SaveChangesAsync();

            destination.UserSubscriptions.AddRange(source.UserSubscriptions);
            destination.UserCourseTypes.AddRange(source.UserCourseTypes);

            var resendActivation = destination.Email != userViewModel.Email;

            if (!destination.EmailConfirmed)
            {
                await userManager.SetUserNameAsync(destination, userViewModel.Email);
                await userManager.SetEmailAsync(destination, userViewModel.Email);
            }

            await dbContext.SaveChangesAsync();

            if (resendActivation)
            {
                await SendActivationMail(userViewModel.Email, destination);
            }

            return new NoContentResult();
        }

        [HttpPatch("resend/activation/{email}")]
        public async Task<IActionResult> ResendActivationMAil(string email)
        {
            var user = await userManager.FindByNameAsync(email);
            await SendActivationMail(email, user);

            return new NoContentResult();
        }

        private async Task SendActivationMail(string email, User user)
        {
            var code = await userManager.GenerateEmailConfirmationTokenAsync(user);
            var urlEncode = WebUtility.UrlEncode(code);
            var url = $@"https://rowinpt.azurewebsites.net/activate?id={user.Id}&code={urlEncode}";

            telemetryClient.TrackEvent("SendActivationMail", new Dictionary<string, string>
            {
                {"email", email},
                {"code", code },
                {"url", url },
                {"urlEncode", urlEncode }
            });

            var message = new MailMessage
            {
                ToAddress = email,
                Subject = "Je persoonlijke account",
                PlainTextContent = string.Format(MailTemplate.ActivationPlainText, user.FirstName, url),
                HtmlContent = string.Format(MailTemplate.ActivationHtml, user.FirstName, url)
            };
            await emailService.SendAsync(message);
        }
    }
}
