using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rowinpt.api.Constants;
using rowinpt.api.Models;
using rowinpt.api.ViewModels;

namespace rowinpt.api
{
    [Route("api/schedules")]
    [Authorize(Roles = Roles.Admin + "," + Roles.User + "," + Roles.Mod)]
    public class ScheduleController : Controller
    {
        private readonly IHttpContextAccessor contextAccessor;
        private readonly RowinContext dbContext;
        private readonly TelemetryClient telemetryClient;

        public ScheduleController(IHttpContextAccessor contextAccessor, RowinContext dbContext)
        {
            this.contextAccessor = contextAccessor;
            this.dbContext = dbContext;
            telemetryClient = new TelemetryClient();
        }

        [HttpGet]
        public async Task<IEnumerable<ScheduleViewModel>> Get()
        {
            var currentUserId = GetCurrentUserId();

            var schedules = await dbContext.Schedules
                .Include(s => s.Timetable)
                .Include(s => s.Timetable.Location)
                .Include(s => s.Timetable.Course)
                .Include(s => s.Timetable.User)
                .Where(s => s.UserId == currentUserId)
                .Where(s => s.Date >= DateTime.Today)
                .ToListAsync();

            return schedules.Select(ScheduleViewModel.Map);
        }

        [HttpGet("{id}", Name = "GetSchedule")]
        public async Task<IActionResult> GetById(int id)
        {
            var currentUserId = GetCurrentUserId();
            var userSchedules =
                from schedule in dbContext.Schedules
                where schedule.UserId == currentUserId
                select schedule;

            var userSchedule = await userSchedules
                .Include(s => s.Timetable)
                .Include(s => s.Timetable.Location)
                .Include(s => s.Timetable.Course)
                .SingleAsync(s => s.Id == id);

            return new ObjectResult(ScheduleViewModel.Map(userSchedule));
        }

        [HttpPost]
        public async Task<IActionResult> New([FromBody]ScheduleViewModel scheduleViewModel)
        {
            var currentUserId = GetCurrentUserId();
            var timeTable = await dbContext.Timetables
                .Include(t => t.Location)
                .Include(t => t.Course)
                .SingleAsync(t => t.Id == scheduleViewModel.TimetableId);

            var alreadySubscribedSchedules = await dbContext.Schedules
                    .Include(s => s.Timetable)
                    .Where(s => s.Timetable.Id == scheduleViewModel.TimetableId &&
                                s.Date.Date == scheduleViewModel.Date.Date)
                    .CountAsync();

            var meta = new Dictionary<string, string>
            {
                {"user id", currentUserId.ToString()},
                {"timetable id", scheduleViewModel.TimetableId.ToString()},
                {"date", scheduleViewModel.Date.ToShortDateString() }
            };

            if (alreadySubscribedSchedules >= timeTable.Course.Capacity)
            {
                telemetryClient.TrackTrace("Course has reached it's capacity", SeverityLevel.Warning, meta);
                return BadRequest();
            }

            var courseTypeId = timeTable.Course.CourseTypeId;
            var user = await dbContext.Users
                .Include(u => u.UserCourseTypes)
                .Include(u => u.UserSubscriptions)
                .ThenInclude(us => us.Subscription)
                .SingleAsync(u => u.Id == currentUserId);

            if (user.UserCourseTypes.All(uc => uc.CourseTypeId != courseTypeId))
            {
                telemetryClient.TrackTrace("User does not have any subscriptions for this coursetype",
                    SeverityLevel.Warning, meta);
                return BadRequest();
            }

            if (await dbContext.Schedules.SingleOrDefaultAsync(s => s.UserId == currentUserId &&
                                                                    s.TimetableId == scheduleViewModel.TimetableId &&
                                                                    s.Date.Date == scheduleViewModel.Date.Date) != null)
            {
                telemetryClient.TrackTrace("User is trying to send a schedule for the second time",
                    SeverityLevel.Warning, meta);
                return BadRequest();
            }

            var count = dbContext.Schedules.Count(s => s.UserId == currentUserId && s.Date >= DateTime.Today);
            var subscription = user.UserSubscriptions.Single(us => us.Subscription.CourseTypeId == courseTypeId);
            var type = (int) subscription.Subscription.Type;
            if (type != 0 && count >= type * 4)
            {
                meta.Add("schedules count", count.ToString());
                telemetryClient.TrackTrace("User has reached it's maximum capacity for the coming 4 weeks",
                    SeverityLevel.Warning, meta);
                return BadRequest();
            }

            var newSchedule = scheduleViewModel.ToEntity(currentUserId, timeTable);
            await dbContext.Schedules.AddAsync(newSchedule);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var schedule = await dbContext.Schedules.Include(s => s.Timetable).SingleAsync(s => s.Id == id);
            var limit = schedule.Date.Add(schedule.Timetable.StartTime);

            if (DateTime.Now.AddHours(1) >= limit)
            {
                return BadRequest();
            }

            dbContext.Schedules.Remove(schedule);
            await dbContext.SaveChangesAsync();

            return new NoContentResult();
        }

        [HttpGet("getwork")]
        [Authorize(Roles = Roles.Admin + "," + Roles.Mod)]
        public async Task<IEnumerable<WorkViewModel>> GetWork()
        {
            var now = DateTime.Now.Date;
            var cap = now.AddMonths(1);

            var includableQueryable = dbContext.Schedules.Include(s => s.User).Include(s => s.Timetable)
                .Include(s => s.Timetable.Location).Include(s => s.Timetable.Course).Include(s => s.Timetable.User);

            var cappedSchedules =
                from schedule in includableQueryable
                where schedule.Date >= now && schedule.Date <= cap
                select schedule;

            var work =
                from schedule in await cappedSchedules.ToListAsync()
                group schedule.User by new {schedule.Date, schedule.Timetable,}
                into schedules
                let timetable = schedules.Key.Timetable
                orderby schedules.Key.Date, timetable.LocationId, timetable.StartTime
                let users =
                    from userSchedule in schedules
                    select userSchedule.FirstName + " " + userSchedule.LastName
                select new WorkViewModel
                {
                    Date = schedules.Key.Date.ToString("yyyy-M-d"),
                    Start = timetable.StartTime.ToString(@"hh\:mm"),
                    End = timetable.EndTime.ToString(@"hh\:mm"),
                    RegisteredUsers = users.ToList(),
                    Moderator = timetable.User.FirstName,
                    Course = timetable.Course.Name,
                    Location = timetable.Location.Name,
                    LocationId = timetable.LocationId
                };

            return work.ToList();
        }

        private int GetCurrentUserId()
        {
            var principal = contextAccessor.HttpContext.User;
            var claimsId = principal.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
            var currentUserId = int.Parse(claimsId);
            return currentUserId;
        }
    }
}
