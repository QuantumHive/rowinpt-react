DECLARE @today DATE = GETDATE();
UPDATE dbo.AspNetUsers SET Startdate = @today;
ALTER TABLE [dbo].[AspNetUsers] ALTER COLUMN [Startdate] DATE NOT NULL; 