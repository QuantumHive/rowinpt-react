using System;
using System.Collections.Generic;
using System.Linq;
using rowinpt.api.Models;

namespace rowinpt.api.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public bool Male { get; set; }
        public bool Female { get; set; }
        public DateTime? Birthdate { get; set; }
        public int? CustomerId { get; set; }
        public string Role { get; set; }
        public int RoleId { get; set; }
        public DateTime Startdate { get; set; }

        public List<int> Subscriptions { get; set; }

        public static UserViewModel Map(User user)
        {
            return new UserViewModel
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Mobile = user.PhoneNumber,
                Male = user.Sex == 1,
                Female = user.Sex == 2,
                Birthdate = user.Birthdate,
                Subscriptions = user.UserSubscriptions.Select(userSupscription => userSupscription.SubscriptionId)
                    .ToList(),
                RoleId = user.Roles.Single().RoleId,
                CustomerId = user.CustomerId,
            };
        }

        public User MapToUserEntity(IEnumerable<Subscription> subscriptions)
        {
            var user = new User
            {
                Id = Id,
                Email = Email,
                UserName = Email,
                PhoneNumber = Mobile,
                CustomerId = CustomerId,
                FirstName = FirstName,
                LastName = LastName,
                Sex = (byte) (Male ? 1 : Female ? 2 : 0),
                Birthdate = Birthdate,
                UserSubscriptions = UserSubscriptions(subscriptions, Id),
                UserCourseTypes = UserCourseTypes(subscriptions, Id),
                Startdate = Startdate,
            };

            return user;
        }

        private List<UserSubscription> UserSubscriptions(IEnumerable<Subscription> subscriptions, int userId)
        {
            var userSubscriptions =
                from subscription in subscriptions
                where Subscriptions.Contains(subscription.Id)
                select new UserSubscription
                {
                    SubscriptionId = subscription.Id,
                    UserId = userId,
                    Subscription = subscription
                };

            return userSubscriptions.ToList();
        }

        private List<UserCourseType> UserCourseTypes(IEnumerable<Subscription> subscriptions, int userId)
        {
            var courseTypes =
                from userSubscription in UserSubscriptions(subscriptions, userId)
                let courseType = userSubscription.Subscription.CourseType
                group courseType.Id by courseType.Id
                into courseTypeGroup
                select new UserCourseType
                {
                    CourseTypeId = courseTypeGroup.Key,
                    UserId = userId
                };

            return courseTypes.ToList();
        }
    }
}