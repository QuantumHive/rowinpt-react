using rowinpt.api.Models;

namespace rowinpt.api.ViewModels
{
    public class CourseTypeViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public static CourseTypeViewModel Map(CourseType courseType)
        {
            return new CourseTypeViewModel
            {
                Id = courseType.Id,
                Name = courseType.Name,
            };
        }
    }
}
