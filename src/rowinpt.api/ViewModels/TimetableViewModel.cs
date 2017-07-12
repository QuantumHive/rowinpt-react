using System;
using rowinpt.api.Models;

namespace rowinpt.api.ViewModels
{
    public class TimetableViewModel
    {
        public int Id { get; set; }
        public DayOfWeek Day { get; set; }
        public string Start { get; set; }
        public string End { get; set; }

        public int CourseId { get; set; }
        public int LocationId { get; set; }

        public static TimetableViewModel Map(Timetable timetable)
        {
            return new TimetableViewModel
            {
                Id = timetable.Id,
                CourseId = timetable.CourseId,
                LocationId = timetable.LocationId,
                Day = timetable.DayOfWeek,
                Start = timetable.StartTime.ToString(@"hh\:mm"),
                End = timetable.EndTime.ToString(@"hh\:mm"),
            };
        }
    }
}
