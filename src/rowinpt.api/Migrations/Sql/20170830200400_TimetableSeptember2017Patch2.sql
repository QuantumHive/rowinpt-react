UPDATE Subscriptions SET [Type] = 0 WHERE Id = 13;

UPDATE Timetables SET [Active] = 0 WHERE Id = 13;
UPDATE Timetables SET [Active] = 0 WHERE Id = 31;
UPDATE Timetables SET [Active] = 0 WHERE Id = 6;

DECLARE @romano INT = 6;

UPDATE Timetables SET UserId = @romano WHERE Id = 25;
UPDATE Timetables SET CourseId = 12 WHERE Id = 7;
UPDATE Courses SET [Name] = 'Kids circuit 5 t/m 14 jaar' WHERE Id = 4;

UPDATE Timetables SET UserId = @romano WHERE Id = 21;
UPDATE Timetables SET UserId = @romano WHERE Id = 29;

DECLARE @chidel INT;
SET @chidel = (
    SELECT [u].[Id]
    FROM [dbo].[AspNetUsers] [u]
    WHERE [u].[UserName] = 'chidel@rowinpt.com');

UPDATE Timetables SET UserId = @chidel WHERE UserId = 3;

DELETE FROM AspNetUserRoles WHERE UserId = 3;
DELETE FROM UserCourseType WHERE UserId = 3;
DELETE FROM UserSubscription WHERE UserId = 3;
DELETE FROM AspNetUsers WHERE Id = 3;