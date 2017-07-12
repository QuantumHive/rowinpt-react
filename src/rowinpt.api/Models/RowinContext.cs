using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace rowinpt.api.Models
{
    public class RowinContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public RowinContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.OnModelCreating();
        }

        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<CourseType> CourseTypes { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Timetable> Timetables { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
    }
}
