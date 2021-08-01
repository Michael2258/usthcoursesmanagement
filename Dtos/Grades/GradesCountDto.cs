namespace coursesmanagement.Dtos.Grades
{
    public class GradesCountDto : IResponseDto
    {
        public string GradeLevel { get; set; }
        public int Count { get; set; }
    }
}