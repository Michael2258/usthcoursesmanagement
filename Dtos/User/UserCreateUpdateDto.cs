using System;
using coursesmanagement.Dtos;

namespace coursesmanagement.Dtos.User
{
    public class UserCreateUpdateDto : IRequestDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Email { get; set; }
        public string[] Roles { get; set; }
        public string Avatar { get; set; }
    }
}