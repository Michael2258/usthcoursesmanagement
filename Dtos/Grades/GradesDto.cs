using coursesmanagement.Dtos;

namespace coursesmanagement.Dtos.Grades
{
    public class GradesDto : IResponseDto
    {
        public int CourseId { get; set; }
        public double MidtermTestFailed { get; set; }
        public double FinalTestFailed { get; set; }
        public double FinalResultFailed { get; set; }
    }
}