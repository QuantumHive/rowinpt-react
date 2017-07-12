using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace rowinpt.api.Models
{
    public static class SampleData
    {
        public static async Task EnsureSeed(this RowinContext db)
        {
            if (!await db.CourseTypes.AnyAsync())
            {
                var locations = GetLocations();
                var courseTypes = GetCourseTypes();
                var subscriptions = GetSubscriptions(courseTypes);
                var courses = GetCourses(courseTypes);
                var users = await db.Users.ToArrayAsync();
                var timetables = GetTimetables(locations, courses, users);

                await db.Locations.AddRangeAsync(locations);
                await db.CourseTypes.AddRangeAsync(courseTypes);
                await db.Subscriptions.AddRangeAsync(subscriptions);
                await db.Courses.AddRangeAsync(courses);
                await db.Timetables.AddRangeAsync(timetables);

                await db.SaveChangesAsync();
            }
        }

        private static Location[] GetLocations()
        {
            var locations = new[]
            {
                new Location{Name = "Arnhem Noord", Address = "Mercatorweg 65", PostalCode = "6827 DB", City = "Arnhem"},
                new Location{Name = "Elderveld", Address = "Kromwijkplaats 4", PostalCode = "6843 GR", City = "Arnhem"},
                new Location{Name = "Malburgen", Address = "Lupinestraat 12", PostalCode = "6841 GD", City = "Arnhem"},
            };

            return locations;
        }

        private static CourseType[] GetCourseTypes()
        {
            var courseTypes = new[]
            {
                new CourseType{Name = "Begeleid Trainen"},
                new CourseType{Name = "Small Group"},
                new CourseType{Name = "Groepsles"},
                new CourseType{Name = "Personal Training"},
            };

            return courseTypes;
        }

        private static Course[] GetCourses(CourseType[] courseTypes)
        {
            var attendedTraining = courseTypes.Single(ct => ct.Name == "Begeleid Trainen");
            var smallGroup = courseTypes.Single(ct => ct.Name == "Small Group");
            var groupCourse = courseTypes.Single(cr => cr.Name == "Groepsles");

            const int attended = 10;
            const int small = 6;
            const int group = 15;

            var courses = new[]
            {
                new Course {Name = "Full Body Workout (low)", CourseType = groupCourse, Capacity = group},
                new Course {Name = "Groepsfitness (low-mid-high)", CourseType = groupCourse, Capacity = group},
                new Course {Name = "Small Group Training", CourseType = smallGroup, Capacity = small},
                new Course {Name = "Control", CourseType = groupCourse, Capacity = group},
                new Course {Name = "Full Body Workout", CourseType = groupCourse, Capacity = group},
                new Course {Name = "Small Group Bokscamp", CourseType = smallGroup, Capacity = small},
                new Course {Name = "Small Group KUV", CourseType = smallGroup, Capacity = small},
                new Course {Name = "Balance Training (low)", CourseType = groupCourse, Capacity = group},
                new Course {Name = "Kids Circuit 5 t/m 7 jaar", CourseType = groupCourse, Capacity = group},
                new Course {Name = "Kids Circuit 8 t/m 14 jaar", CourseType = groupCourse, Capacity = group},
                new Course {Name = "Circuittraining", CourseType = groupCourse, Capacity = group},
                new Course {Name = "Conditietraining", CourseType = groupCourse, Capacity = group},
                new Course {Name = "Bootcamp", CourseType = groupCourse, Capacity = group},
                new Course {Name = "Begeleid Trainen", CourseType = attendedTraining, Capacity = attended},
            };

            return courses;
        }

        private static Subscription[] GetSubscriptions(CourseType[] courseTypes)
        {
            var attendedTraining = courseTypes.Single(ct => ct.Name == "Begeleid Trainen");
            var smallGroup = courseTypes.Single(ct => ct.Name == "Small Group");
            var groupCourse = courseTypes.Single(cr => cr.Name == "Groepsles");
            var personalTraining = courseTypes.Single(cr => cr.Name == "Personal Training");

            var subscriptions = new[]
            {
                new Subscription{CourseType = attendedTraining, Type = SubscriptionType.OnceAWeek},
                new Subscription{CourseType = attendedTraining, Type = SubscriptionType.TwiceAWeek},
                new Subscription{CourseType = attendedTraining, Type = SubscriptionType.ThriceAWeek},

                new Subscription{CourseType = smallGroup, Type = SubscriptionType.OnceAWeek},
                new Subscription{CourseType = smallGroup, Type = SubscriptionType.TwiceAWeek},
                new Subscription{CourseType = smallGroup, Type = SubscriptionType.ThriceAWeek},

                new Subscription{CourseType = groupCourse, Type = SubscriptionType.OnceAWeek},
                new Subscription{CourseType = groupCourse, Type = SubscriptionType.Unrestricted},

                new Subscription{CourseType = personalTraining, Type = SubscriptionType.Unrestricted},
            };

            return subscriptions;
        }

        private static Timetable[] GetTimetables(Location[] locations, Course[] course, User[] users)
        {
            var arnhem = locations.Single(l => l.Name == "Arnhem Noord");
            var elderveld = locations.Single(l => l.Name == "Elderveld");
            var malburgen = locations.Single(l => l.Name == "Malburgen");

            var nicholas = users.Single(u => u.UserName == "nicholas@rowinpt.com");
            var delano = users.Single(u => u.UserName == "delano@rowinpt.com");
            var luke = users.Single(u => u.UserName == "luke@rowinpt.com");
            var nicole = users.Single(u => u.UserName == "nicole@rowinpt.com");
            var romano = users.Single(u => u.UserName == "romano@rowinpt.com");
            var dario = users.Single(u => u.UserName == "dario@rowinpt.com");

            var timetables = new[]
            {
                new Timetable{DayOfWeek = DayOfWeek.Monday, StartTime = new TimeSpan(11, 0, 0), EndTime = new TimeSpan(12, 0, 0), Location = arnhem, Course = course.Single(c => c.Name == "Full Body Workout (low)"), User = nicholas},
                new Timetable{DayOfWeek = DayOfWeek.Monday, StartTime = new TimeSpan(12, 0, 0), EndTime = new TimeSpan(13, 0, 0), Location = arnhem, Course = course.Single(c => c.Name == "Groepsfitness (low-mid-high)"), User = luke},
                new Timetable{DayOfWeek = DayOfWeek.Monday, StartTime = new TimeSpan(17, 30, 0), EndTime = new TimeSpan(18, 30, 0), Location = arnhem, Course = course.Single(c => c.Name == "Small Group Training"), User = nicholas},
                new Timetable{DayOfWeek = DayOfWeek.Monday, StartTime = new TimeSpan(18, 30, 0), EndTime = new TimeSpan(19, 30, 0), Location = arnhem, Course = course.Single(c => c.Name == "Small Group Training"), User = delano},
                new Timetable{DayOfWeek = DayOfWeek.Monday, StartTime = new TimeSpan(19, 30, 0), EndTime = new TimeSpan(20, 30, 0), Location = arnhem, Course = course.Single(c => c.Name == "Small Group Training"), User = delano},
                new Timetable{DayOfWeek = DayOfWeek.Monday, StartTime = new TimeSpan(19, 30, 0), EndTime = new TimeSpan(20, 30, 0), Location = arnhem, Course = course.Single(c => c.Name == "Control"), User = romano},
                new Timetable{DayOfWeek = DayOfWeek.Tuesday, StartTime = new TimeSpan(10, 0, 0), EndTime = new TimeSpan(11, 0, 0), Location = arnhem, Course = course.Single(c => c.Name == "Full Body Workout"), User = delano},
                new Timetable{DayOfWeek = DayOfWeek.Tuesday, StartTime = new TimeSpan(18, 30, 0), EndTime = new TimeSpan(19, 30, 0), Location = arnhem, Course = course.Single(c => c.Name == "Small Group Bokscamp"), User = delano},
                new Timetable{DayOfWeek = DayOfWeek.Tuesday, StartTime = new TimeSpan(19, 30, 0), EndTime = new TimeSpan(20, 30, 0), Location = arnhem, Course = course.Single(c => c.Name == "Small Group KUV"), User = nicole},
                new Timetable{DayOfWeek = DayOfWeek.Tuesday, StartTime = new TimeSpan(19, 30, 0), EndTime = new TimeSpan(20, 30, 0), Location = arnhem, Course = course.Single(c => c.Name == "Full Body Workout"), User = delano},
                new Timetable{DayOfWeek = DayOfWeek.Wednesday, StartTime = new TimeSpan(10, 0, 0), EndTime = new TimeSpan(11, 0, 0), Location = arnhem, Course = course.Single(c => c.Name == "Balance Training (low)"), User = nicholas},
                new Timetable{DayOfWeek = DayOfWeek.Wednesday, StartTime = new TimeSpan(13, 0, 0), EndTime = new TimeSpan(14, 0, 0), Location = arnhem, Course = course.Single(c => c.Name == "Groepsfitness (low-mid-high)"), User = delano},
                new Timetable{DayOfWeek = DayOfWeek.Wednesday, StartTime = new TimeSpan(15, 0, 0), EndTime = new TimeSpan(16, 0, 0), Location = arnhem, Course = course.Single(c => c.Name == "Kids Circuit 5 t/m 7 jaar"), User = delano},
                new Timetable{DayOfWeek = DayOfWeek.Wednesday, StartTime = new TimeSpan(16, 0, 0), EndTime = new TimeSpan(17, 0, 0), Location = arnhem, Course = course.Single(c => c.Name == "Kids Circuit 8 t/m 14 jaar"), User = delano},
                new Timetable{DayOfWeek = DayOfWeek.Wednesday, StartTime = new TimeSpan(18, 30, 0), EndTime = new TimeSpan(19, 30, 0), Location = arnhem, Course = course.Single(c => c.Name == "Small Group Training"), User = delano},
                new Timetable{DayOfWeek = DayOfWeek.Wednesday, StartTime = new TimeSpan(19, 30, 0), EndTime = new TimeSpan(20, 30, 0), Location = arnhem, Course = course.Single(c => c.Name == "Small Group Training"), User = delano},
                new Timetable{DayOfWeek = DayOfWeek.Wednesday, StartTime = new TimeSpan(19, 30, 0), EndTime = new TimeSpan(20, 30, 0), Location = arnhem, Course = course.Single(c => c.Name == "Circuittraining"), User = romano},
                new Timetable{DayOfWeek = DayOfWeek.Thursday, StartTime = new TimeSpan(19, 30, 0), EndTime = new TimeSpan(20, 30, 0), Location = arnhem, Course = course.Single(c => c.Name == "Conditietraining"), User = nicholas},
                new Timetable{DayOfWeek = DayOfWeek.Thursday, StartTime = new TimeSpan(20, 30, 0), EndTime = new TimeSpan(21, 30, 0), Location = arnhem, Course = course.Single(c => c.Name == "Small Group Training"), User = nicholas},
                new Timetable{DayOfWeek = DayOfWeek.Friday, StartTime = new TimeSpan(19, 0, 0), EndTime = new TimeSpan(20, 0, 0), Location = arnhem, Course = course.Single(c => c.Name == "Small Group Training"), User = delano},
                new Timetable{DayOfWeek = DayOfWeek.Friday, StartTime = new TimeSpan(20, 0, 0), EndTime = new TimeSpan(21, 0, 0), Location = arnhem, Course = course.Single(c => c.Name == "Small Group Bokscamp"), User = delano},
                new Timetable{DayOfWeek = DayOfWeek.Saturday, StartTime = new TimeSpan(10, 0, 0), EndTime = new TimeSpan(11, 0, 0), Location = arnhem, Course = course.Single(c => c.Name == "Bootcamp"), User = nicholas},
                new Timetable{DayOfWeek = DayOfWeek.Sunday, StartTime = new TimeSpan(10, 0, 0), EndTime = new TimeSpan(11, 0, 0), Location = arnhem, Course = course.Single(c => c.Name == "Circuittraining"), User = delano},
                new Timetable{DayOfWeek = DayOfWeek.Monday, StartTime = new TimeSpan(18, 30, 0), EndTime = new TimeSpan(19, 30, 0), Location = elderveld, Course = course.Single(c => c.Name == "Begeleid Trainen"), User = dario},
                new Timetable{DayOfWeek = DayOfWeek.Monday, StartTime = new TimeSpan(19, 30, 0), EndTime = new TimeSpan(20, 30, 0), Location = elderveld, Course = course.Single(c => c.Name == "Small Group Training"), User = dario},
                new Timetable{DayOfWeek = DayOfWeek.Wednesday, StartTime = new TimeSpan(18, 30, 0), EndTime = new TimeSpan(19, 30, 0), Location = elderveld, Course = course.Single(c => c.Name == "Small Group Training"), User = dario},
                new Timetable{DayOfWeek = DayOfWeek.Wednesday, StartTime = new TimeSpan(19, 30, 0), EndTime = new TimeSpan(20, 30, 0), Location = elderveld, Course = course.Single(c => c.Name == "Begeleid Trainen"), User = dario},
                new Timetable{DayOfWeek = DayOfWeek.Friday, StartTime = new TimeSpan(18, 0, 0), EndTime = new TimeSpan(19, 0, 0), Location = elderveld, Course = course.Single(c => c.Name == "Begeleid Trainen"), User = dario},
                new Timetable{DayOfWeek = DayOfWeek.Friday, StartTime = new TimeSpan(19, 0, 0), EndTime = new TimeSpan(20, 0, 0), Location = elderveld, Course = course.Single(c => c.Name == "Small Group Training"), User = dario},
                new Timetable{DayOfWeek = DayOfWeek.Wednesday, StartTime = new TimeSpan(19, 30, 0), EndTime = new TimeSpan(20, 30, 0), Location = malburgen, Course = course.Single(c => c.Name == "Circuittraining"), User = luke},
            };

            return timetables;
        }
    }
}
