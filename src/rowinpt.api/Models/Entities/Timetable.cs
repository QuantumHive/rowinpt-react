using System;
using System.Collections.Generic;

namespace rowinpt.api.Models
{
    public class Timetable
    {
        public int Id { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public bool Active { get; set; }

        public int CourseId { get; set; }
        public int LocationId { get; set; }
        public Course Course { get; set; }
        public Location Location { get; set; }

        public List<Schedule> Schedules { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
