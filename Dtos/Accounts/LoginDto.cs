using System.ComponentModel.DataAnnotations;

namespace coursesmanagement.Dtos.Accounts
{
    public class LoginDto : IRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}