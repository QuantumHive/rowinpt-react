SET IDENTITY_INSERT Subscriptions ON;
INSERT INTO Subscriptions (Id, CourseTypeId, [Type]) VALUES (11, 5, 1);
INSERT INTO Subscriptions (Id, CourseTypeId, [Type]) VALUES (12, 5, 2);
INSERT INTO Subscriptions (Id, CourseTypeId, [Type]) VALUES (13, 5, 3);
SET IDENTITY_INSERT Subscriptions OFF;

INSERT INTO UserSubscription (UserId, SubscriptionId)
SELECT us.UserId, 11
FROM UserSubscription us
WHERE us.SubscriptionId = 1

INSERT INTO UserSubscription (UserId, SubscriptionId)
SELECT us.UserId, 12
FROM UserSubscription us
WHERE us.SubscriptionId = 7

INSERT INTO UserSubscription (UserId, SubscriptionId)
SELECT us.UserId, 13
FROM UserSubscription us
WHERE us.SubscriptionId = 6

INSERT INTO UserCourseType (UserId, CourseTypeId)
SELECT uct.UserId, 5
FROM UserCourseType uct
WHERE uct.CourseTypeId = 1