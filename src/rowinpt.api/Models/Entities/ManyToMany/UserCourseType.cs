namespace rowinpt.api.Models
{
    public class UserCourseType
    {
        public int UserId { get; set; }
        public int CourseTypeId { get; set; }

        public User User { get; set; }
        public CourseType CourseType { get; set; }
    }
}
