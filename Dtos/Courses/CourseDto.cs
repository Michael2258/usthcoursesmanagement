using System.Threading;
using coursesmanagement.Dtos.CourseDetails;
using coursesmanagement.Dtos.Teacher;

namespace coursesmanagement.Dtos.Courses
{
    public class CourseDto : IResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Semester { get; set; }
        public int NumYear { get; set; }
        public int Department { get; set; }
        public string SchoolYear { get; set; }
        public int TeacherId { get; set; }
        public CourseDetailDto CourseDetail { get; set; }
    }
}