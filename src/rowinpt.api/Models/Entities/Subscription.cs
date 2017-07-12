using System.Collections.Generic;

namespace rowinpt.api.Models
{
    public class Subscription
    {
        public int Id { get; set; }
        public SubscriptionType Type { get; set; }

        public int CourseTypeId { get; set; }
        public CourseType CourseType { set; get; }
        public List<UserSubscription> UserSubscriptions { get; set; }
    }
}
