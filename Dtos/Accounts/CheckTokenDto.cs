using System.ComponentModel.DataAnnotations;
using coursesmanagement.Dtos;

namespace coursesmanagement.Dtos.Accounts
{
    public class CheckTokenDto : IRequestDto
    {
        [Required] public string Token { get; set; }
    }
}