using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using coursesmanagement.Dtos.Accounts;
using coursesmanagement.Services;
using coursesmanagement.Validators;


namespace coursesmanagement.Controllers
{
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        /// <summary>
        /// Login
        /// </summary>
        [HttpPost]
        [Route("login")]
        [ValidateModel]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            LoginResponseDto result = await _accountService.Login(model);
            return Ok(result);
        }

        [HttpPost]
        [Route("checktoken")]
        [ValidateModel]
        public bool CheckJwtToken([FromBody] CheckTokenDto model)
        {
            return _accountService.CheckJwtToken(model);
        }

        [HttpGet]
        [Route("info")]
        [Authorize]
        public async Task<IActionResult> Info()
        {
            LoginResponseDto info = await _accountService.Info(User);
            return Ok(info);
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            var response = await _accountService.Register(model);
            if (response.Succeeded)
                return Created("User", response);

            return BadRequest(response.Errors);
        }
    }
}