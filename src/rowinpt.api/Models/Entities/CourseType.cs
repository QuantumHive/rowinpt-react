using System.Collections.Generic;

namespace rowinpt.api.Models
{
    public class CourseType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }

        public List<UserCourseType> UserCourseTypes { get; set; }
        public List<Subscription> Subscriptions { get; set; }
    }
}
