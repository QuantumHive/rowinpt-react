﻿namespace rowinpt.api.Models
{
    public class UserSubscription
    {
        public int UserId { get; set; }
        public int SubscriptionId { get; set; }

        public User User { get; set; }
        public Subscription Subscription { get; set; }
    }
}
