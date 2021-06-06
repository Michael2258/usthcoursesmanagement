using System.Collections.Generic;

namespace coursesmanagement.Dtos.Courses
{
    public class CreateUpdateCourseDto : IRequestDto
    {
        public string Name { get; set; }
        public int Semester { get; set; }
    }
}