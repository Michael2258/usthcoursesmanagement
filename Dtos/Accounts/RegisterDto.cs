using System.ComponentModel.DataAnnotations;
using coursesmanagement.Dtos;

namespace coursesmanagement.Dtos.Accounts
{
    public class RegisterDto : IRequestDto
    {
        [Required] public string UserName { get; set; }
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        [Required] [EmailAddress] public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.",
            MinimumLength = 6)]

        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}