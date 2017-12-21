update Timetables set UserId = 1
where CourseId = 17 AND LocationId = 2 AND
([DayOfWeek] = 2 OR [DayOfWeek] = 4)

update Timetables set Active = 0 where Id = 7
delete from Schedules where TimetableId = 7