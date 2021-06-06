using System.Collections.Generic;
using coursesmanagement.Dtos.Courses;

namespace coursesmanagement.Dtos.SchoolYear
{
    public class SchoolYearDto : IResponseDto
    {
        public int? Id { get; set; }
        public string Year { get; set; }
        public int? NumberOfCourses { get; set; }
        public IEnumerable<CourseDto> Courses { get; set; }
    }
}