using rowinpt.api.Models;

namespace rowinpt.api.ViewModels
{
    public class CourseViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CourseTypeId { get; set; }

        public static CourseViewModel Map(Course course)
        {
            return new CourseViewModel
            {
                Id = course.Id,
                Name = course.Name,
                CourseTypeId = course.CourseTypeId,
            };
        }
    }
}
