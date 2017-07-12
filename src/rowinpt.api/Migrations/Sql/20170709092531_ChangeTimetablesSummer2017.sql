UPDATE [dbo].[Timetables] SET [Active] = 1;
UPDATE [dbo].[Courses] SET [Name] = 'Full body workout low-mid' WHERE [Name] = 'Full Body Workout (low)';
UPDATE [dbo].[Courses] SET [Name] = 'Balance training low-mid' WHERE [Name] = 'Balance Training (low)';

DECLARE @smallGroupType INT;
SET @smallGroupType = (
    SELECT [ct].[Id]
    FROM [dbo].[CourseTypes] [ct]
    WHERE [ct].[Name] = 'Small Group');

DECLARE @attendedTrainingType INT;
SET @attendedTrainingType = (
    SELECT [ct].[Id]
    FROM [dbo].[CourseTypes] [ct]
    WHERE [ct].[Name] = 'Begeleid Trainen');

----------------
--arnhem-noord--
----------------
DECLARE @arnhem INT;
SET @arnhem = (
    SELECT [l].[Id]
    FROM [dbo].[Locations] [l]
    WHERE [l].[Name] = 'Arnhem Noord');

-- monday
UPDATE [dbo].[Timetables] SET [StartTime] = '12:00:00', [EndTime] = '13:00:00' WHERE [DayOfWeek] = 1 AND [StartTime] = '11:00:00' AND [LocationId] = @arnhem;

DECLARE @groupFitnessLowMidHigh INT;
SET @groupFitnessLowMidHigh = (
    SELECT [c].[Id]
    FROM [dbo].[Courses] [c]
    WHERE [c].[Name] = 'Groepsfitness (low-mid-high)');

UPDATE [dbo].[Timetables] SET [Active] = 0 WHERE [DayOfWeek] = 1 AND [StartTime] = '12:00:00' AND [CourseId] = @groupFitnessLowMidHigh AND [LocationId] = @arnhem;

DECLARE @nicole INT;
SET @nicole = (
    SELECT [u].[Id]
    FROM [dbo].[AspNetUsers] [u]
    WHERE [u].[UserName] = 'nicole@rowinpt.com');

INSERT INTO [dbo].[Courses] ([Name], [Capacity], [CourseTypeId]) VALUES (N'Small Group Techniek', 6, @smallGroupType);
DECLARE @smallGroupTechnique INT;
SET @smallGroupTechnique = (
    SELECT [c].[Id]
    FROM [dbo].[Courses] [c]
    WHERE [c].[Name] = 'Small Group Techniek');

UPDATE [dbo].[Timetables] SET [CourseId] = @smallGroupTechnique, [UserId] = @nicole WHERE [DayOfWeek] = 1 AND [StartTime] = '17:30:00' AND [LocationId] = @arnhem;

-- tuesday
DECLARE @fullBodyWorkoutLowMid INT;
SET @fullBodyWorkoutLowMid = (
    SELECT [c].[Id]
    FROM [dbo].[Courses] [c]
    WHERE [c].[Name] = 'Full body workout low-mid');
UPDATE [dbo].[Timetables] SET [CourseId] = @fullBodyWorkoutLowMid WHERE [DayOfWeek] = 2 AND [StartTime] = '10:00:00' AND [LocationId] = @arnhem;

-- wednesday
DECLARE @delano INT;
SET @delano = (
    SELECT [u].[Id]
    FROM [dbo].[AspNetUsers] [u]
    WHERE [u].[UserName] = 'delano@rowinpt.com');
UPDATE [dbo].[Timetables] SET [StartTime] = '12:00:00', [EndTime] = '13:00:00', [UserId] = @delano WHERE [DayOfWeek] = 3 AND [StartTime] = '10:00:00' AND [LocationId] = @arnhem;
UPDATE [dbo].[Timetables] SET [Active] = 0 WHERE [DayOfWeek] = 3 AND [StartTime] = '13:00:00' AND [CourseId] = @groupFitnessLowMidHigh AND [LocationId] = @arnhem;

INSERT INTO [dbo].[Courses] ([Name], [Capacity], [CourseTypeId]) VALUES (N'Small Group Kracht', 6, @smallGroupType);
DECLARE @smallGroupPower INT;
SET @smallGroupPower = (
    SELECT [c].[Id]
    FROM [dbo].[Courses] [c]
    WHERE [c].[Name] = 'Small Group Kracht');
DECLARE @romano INT;
SET @romano = (
    SELECT [u].[Id]
    FROM [dbo].[AspNetUsers] [u]
    WHERE [u].[UserName] = 'romano@rowinpt.com');
INSERT INTO [dbo].[Timetables] ([CourseId], [DayOfWeek], [StartTime], [EndTime], [LocationId], [UserId], [Active]) VALUES (@smallGroupPower, 3, '20:30', '21:30', @arnhem, @romano, 1);

-- friday
DECLARE @circuitTraing INT;
SET @circuitTraing = (
    SELECT [c].[Id]
    FROM [dbo].[Courses] [c]
    WHERE [c].[Name] = 'Circuittraining');
INSERT INTO [dbo].[Timetables] ([CourseId], [DayOfWeek], [StartTime], [EndTime], [LocationId], [UserId], [Active]) VALUES (@circuitTraing, 5, '10:00', '11:00', @arnhem, @delano, 1);

-------------
--elderveld--
-------------
DECLARE @elderveld INT;
SET @elderveld = (
    SELECT [l].[Id]
    FROM [dbo].[Locations] [l]
    WHERE [l].[Name] = 'Elderveld');

-- monday
UPDATE [dbo].[Timetables] SET [StartTime] = '12:00:00', [EndTime] = '13:00:00' WHERE [DayOfWeek] = 1 AND [StartTime] = '11:00:00' AND [LocationId] = @elderveld;

-- wednesday
DECLARE @dario INT;
SET @dario = (
    SELECT [u].[Id]
    FROM [dbo].[AspNetUsers] [u]
    WHERE [u].[UserName] = 'dario@rowinpt.com');
DECLARE @attendedTraining INT;
SET @attendedTraining = (
    SELECT [c].[Id]
    FROM [dbo].[Courses] [c]
    WHERE [c].[Name] = 'Begeleid Trainen');
INSERT INTO [dbo].[Timetables] ([CourseId], [DayOfWeek], [StartTime], [EndTime], [LocationId], [UserId], [Active]) VALUES (@attendedTraining, 3, '17:30', '18:30', @elderveld, @dario, 1);