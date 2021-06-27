using System.Collections.Generic;
using coursesmanagement.Dtos.CourseDetails;
using coursesmanagement.Dtos.Teacher;

namespace coursesmanagement.Dtos.Courses
{
    public class CreateUpdateCourseDto : IRequestDto
    {
        public string Name { get; set; }
        public int Semester { get; set; }
        public string SchoolYear { get; set; }
        public int TeacherId { get; set; }
        public CourseDetailUpdateDto CourseDetail { get; set; }
    }
}