using System;
using System.Reflection.PortableExecutable;

namespace rowinpt.api.Models
{
    public class Schedule
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }

        public int TimetableId { get; set; }
        public Timetable Timetable { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
