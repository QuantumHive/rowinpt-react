UPDATE CourseTypes SET [Active] = 1;
UPDATE Timetables SET [Active] = 0 WHERE Id = 3;

SET IDENTITY_INSERT CourseTypes ON
INSERT INTO CourseTypes (Id, [Name], [Active]) VALUES (5, 'Begeleid Sporten', 1);
SET IDENTITY_INSERT CourseTypes OFF
SET IDENTITY_INSERT Courses ON
INSERT INTO Courses (Id, Capacity, CourseTypeId, [Name]) VALUES (17, 8, 5, 'Begeleid Sporten');
SET IDENTITY_INSERT Courses OFF

DECLARE @chidel INT;
SET @chidel = (
    SELECT [u].[Id]
    FROM [dbo].[AspNetUsers] [u]
    WHERE [u].[UserName] = 'chidel@rowinpt.com');

UPDATE Timetables SET [CourseId] = 7, UserId = @chidel WHERE Id = 26

INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 1, '17:00:00', '18:00:00', 2, 7, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 1, '17:30:00', '18:30:00', 2, 7, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 1, '18:00:00', '19:00:00', 2, 7, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 1, '18:30:00', '19:30:00', 2, 7, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 1, '19:00:00', '20:00:00', 2, 7, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 1, '19:30:00', '20:30:00', 2, 7, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 1, '20:00:00', '21:00:00', 2, 7, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 1, '20:30:00', '21:30:00', 2, 7, 1);

INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 2, '17:00:00', '18:00:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 2, '17:30:00', '18:30:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 2, '18:00:00', '19:00:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 2, '18:30:00', '19:30:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 2, '19:00:00', '20:00:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 2, '19:30:00', '20:30:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 2, '20:00:00', '21:00:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 2, '20:30:00', '21:30:00', 2, @chidel, 1);

INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 3, '17:00:00', '18:00:00', 2, 7, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 3, '17:30:00', '18:30:00', 2, 7, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 3, '18:00:00', '19:00:00', 2, 7, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 3, '18:30:00', '19:30:00', 2, 7, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 3, '19:00:00', '20:00:00', 2, 7, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 3, '19:30:00', '20:30:00', 2, 7, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 3, '20:00:00', '21:00:00', 2, 7, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 3, '20:30:00', '21:30:00', 2, 7, 1);

INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 4, '17:00:00', '18:00:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 4, '17:30:00', '18:30:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 4, '18:00:00', '19:00:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 4, '18:30:00', '19:30:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 4, '19:00:00', '20:00:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 4, '19:30:00', '20:30:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 4, '20:00:00', '21:00:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 4, '20:30:00', '21:30:00', 2, @chidel, 1);

INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 5, '17:00:00', '18:00:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 5, '17:30:00', '18:30:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 5, '18:00:00', '19:00:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 5, '18:30:00', '19:30:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 5, '19:00:00', '20:00:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 5, '19:30:00', '20:30:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 5, '20:00:00', '21:00:00', 2, @chidel, 1);
INSERT INTO Timetables (CourseId, [DayOfWeek], StartTime, EndTime, LocationId, UserId, Active) VALUES (17, 5, '20:30:00', '21:30:00', 2, @chidel, 1);

DELETE FROM Schedules
WHERE Id IN (
    SELECT s.Id
    FROM Schedules s
    JOIN Timetables t ON s.TimetableId = t.Id
    WHERE t.CourseId = 3
    AND s.[Date] >= '2017-09-01')