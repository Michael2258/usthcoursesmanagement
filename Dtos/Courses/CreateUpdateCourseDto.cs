using System.Collections.Generic;
using coursesmanagement.Dtos.CourseDetails;

namespace coursesmanagement.Dtos.Courses
{
    public class CreateUpdateCourseDto : IRequestDto
    {
        public string Name { get; set; }
        public int Semester { get; set; }
        public CourseDetailUpdateDto CourseDetail { get; set; }
    }
}