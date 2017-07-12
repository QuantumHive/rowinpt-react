using System.Collections.Generic;

namespace rowinpt.api.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }

        public int CourseTypeId { get; set; }
        public CourseType CourseType { get; set; }
        public List<Timetable> Timetables { get; set; }
    }
}
