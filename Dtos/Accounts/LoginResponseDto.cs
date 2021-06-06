using System.Collections.Generic;
using coursesmanagement.Dtos;

namespace coursesmanagement.Dtos.Accounts
{
    public class LoginResponseDto : IResponseDto
    {
        public string Token { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IEnumerable<string> Roles { get; set; }
        public string Id { get; set; }
        public string Avatar { get; set; }
        public string Email { get; set; }

    }
}