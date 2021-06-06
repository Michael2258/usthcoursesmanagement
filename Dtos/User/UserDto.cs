using System;
using System.Collections.Generic;

namespace coursesmanagement.Dtos.User
{
    public class UserDto : IResponseDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public IEnumerable<string> Roles { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Avatar { get; set; }
    }
}