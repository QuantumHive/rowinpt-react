using rowinpt.api.Models;

namespace rowinpt.api.ViewModels
{
    public class SubscriptionViewModel
    {
        public int Id { get; set; }
        public SubscriptionType Type { get; set; }
        public int CourseTypeId { get; set; }

        public static SubscriptionViewModel Map(Subscription subscription)
        {
            return new SubscriptionViewModel
            {
                Id = subscription.Id,
                Type = subscription.Type,
                CourseTypeId = subscription.CourseTypeId
            };
        }
    }
}
