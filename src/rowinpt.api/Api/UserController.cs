﻿using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
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

        public UserController(
            RowinContext dbContext,
            UserManager<User> userManager,
            IEmailService emailService, RoleManager<IdentityRole<int>> roleManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
            this.emailService = emailService;
            this.roleManager = roleManager;
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
            var url = $@"https://rowinpt.azurewebsites.net/activate?id={user.Id}&code={WebUtility.UrlEncode(code)}";
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
