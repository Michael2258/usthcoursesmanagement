using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace coursesmanagement.Dtos.Accounts
{
    public class RegisterResponseDto
    {
        public bool Succeeded { get; set; }
        public IEnumerable<IdentityError> Errors { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}