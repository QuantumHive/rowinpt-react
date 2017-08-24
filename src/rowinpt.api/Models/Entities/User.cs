using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace rowinpt.api.Models
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? Birthdate { get; set; }
        public byte Sex { get; set; }
        public DateTime Startdate { get; set; }
        public int? CustomerId { get; set; }
        public List<UserCourseType> UserCourseTypes { get; set; }
        public List<UserSubscription> UserSubscriptions { get; set; }
        public List<Schedule> Schedules { get; set; }
        public List<Timetable> Timetables { get; set; }

        public virtual ICollection<IdentityUserRole<int>> Roles { get; } = new List<IdentityUserRole<int>>();
    }
}
