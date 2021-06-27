using coursesmanagement.Dtos;

namespace coursesmanagement.Dtos.Student
{
    public class StudentDto : IResponseDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Avatar { get; set; }

    }
}