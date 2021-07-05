namespace coursesmanagement.Dtos.Grades
{
    public class StudentGradesFromCoursesDto : IResponseDto
    {
        public string StudentId { get; set; }
        public string CourseName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public double Attendance { get; set; }
        public double MidtermTest { get; set; }
        public double FinalTest { get; set; }
        public double FinalResult { get; set; }
    }
}