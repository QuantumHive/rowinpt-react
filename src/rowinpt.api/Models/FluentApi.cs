using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace rowinpt.api.Models
{
    public static class FluentApi
    {
        public static void OnModelCreating(this ModelBuilder modelBuilder)
        {
            //entities
            modelBuilder.ConfigureUser();
            modelBuilder.ConfigureLocation();
            modelBuilder.ConfigureCourseType();
            modelBuilder.ConfigureCourse();
            modelBuilder.ConfigureSchedule();

            //ManyToMany
            modelBuilder.ConfigureUserCourseType();
            modelBuilder.ConfigureUserSubscription();
        }

        #region Entities
        private static void ConfigureUser(this ModelBuilder modelBuilder)
        {
            var builder = modelBuilder.Entity<User>();
            builder.Property(u => u.FirstName).IsRequired().HasMaxLength(100);
            builder.Property(u => u.LastName).IsRequired().HasMaxLength(100);
            builder.Property(u => u.Birthdate).HasColumnType("date");
            builder.Property(u => u.Startdate).HasColumnType("date");
            builder.Property(u => u.Sex);

            builder.HasMany(u => u.Schedules).WithOne(s => s.User).HasForeignKey(s => s.UserId).OnDelete(DeleteBehavior.Restrict);
        }

        private static void ConfigureLocation(this ModelBuilder modelBuilder)
        {
            var builder = modelBuilder.Entity<Location>();
            builder.Property(l => l.Name).IsRequired().HasMaxLength(100);
            builder.Property(l => l.Address).IsRequired().HasMaxLength(100);
            builder.Property(l => l.PostalCode).IsRequired().HasMaxLength(10);
            builder.Property(l => l.City).IsRequired().HasMaxLength(100);
        }

        private static void ConfigureCourseType(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CourseType>().Property(ct => ct.Name).IsRequired().HasMaxLength(50);
        }

        public static void ConfigureCourse(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>().Property(c => c.Name).IsRequired().HasMaxLength(50);
        }

        public static void ConfigureSchedule(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Schedule>().Property(s => s.Date).HasColumnType("date");
        }
        #endregion

        #region ManyToMany
        private static void ConfigureUserCourseType(this ModelBuilder modelBuilder)
        {
            var builder = modelBuilder.Entity<UserCourseType>();
            builder.HasKey(uct => new { uct.UserId, uct.CourseTypeId });
            builder
                .HasOne(uct => uct.User)
                .WithMany(u => u.UserCourseTypes)
                .HasForeignKey(uct => uct.UserId);
            builder
                .HasOne(uct => uct.CourseType)
                .WithMany(ct => ct.UserCourseTypes)
                .HasForeignKey(uct => uct.CourseTypeId);
        }

        private static void ConfigureUserSubscription(this ModelBuilder modelBuilder)
        {
            var builder = modelBuilder.Entity<UserSubscription>();
            builder.HasKey(us => new { us.UserId, us.SubscriptionId });
            builder
                .HasOne(us => us.User)
                .WithMany(u => u.UserSubscriptions)
                .HasForeignKey(us => us.UserId);
            builder
                .HasOne(us => us.Subscription)
                .WithMany(s => s.UserSubscriptions)
                .HasForeignKey(us => us.SubscriptionId);
        }
        #endregion
    }
}
