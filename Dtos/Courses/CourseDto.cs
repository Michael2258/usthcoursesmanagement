using coursesmanagement.Dtos.CourseDetails;

namespace coursesmanagement.Dtos.Courses
{
    public class CourseDto : IResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Semester { get; set; }
        public CourseDetailDto CourseDetail { get; set; }
    }
}