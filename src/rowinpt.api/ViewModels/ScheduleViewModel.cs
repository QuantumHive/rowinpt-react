using System;
using rowinpt.api.Models;

namespace rowinpt.api.ViewModels
{
    public class ScheduleViewModel
    {
        public int Id { get; set; }
        public int TimetableId { get; set; }
        public string Location { get; set; }
        public string Course { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Start { get; set; }
        public TimeSpan End { get; set; }
        public string Trainer { get; set; }

        public static ScheduleViewModel Map(Schedule schedule)
        {
            return new ScheduleViewModel
            {
                Id = schedule.Id,
                TimetableId = schedule.TimetableId,
                Location = schedule.Timetable.Location.Name,
                Course = schedule.Timetable.Course.Name,
                Date = schedule.Date,
                Start = schedule.Timetable.StartTime,
                End = schedule.Timetable.EndTime,
                Trainer = schedule.Timetable.User.FirstName,
            };
        }

        public Schedule ToEntity(int userId, Timetable timetable)
        {
            var schedule = new Schedule
            {
                Date = Date,
                Timetable = timetable,
                UserId = userId,
            };
            return schedule;
        }
    }
}
