using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

using coursesmanagement.Models;
using coursesmanagement.Data;
using coursesmanagement.Dtos.Accounts;

namespace coursesmanagement.Services
{
    public interface IAccountService
    {
        Task<RegisterResponseDto> Register(RegisterDto model);
        Task<LoginResponseDto> Login(LoginDto model);
        bool CheckJwtToken(CheckTokenDto model);
        Task<LoginResponseDto> Info(ClaimsPrincipal claimsPrincipal);
    }

    public class AccountService : IAccountService
    {
        private readonly USTHCourseDbContext _usthCoursesDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountService(UserManager<ApplicationUser> userManager,
            IConfiguration configuration, USTHCourseDbContext usthCoursesDbContext, SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _configuration = configuration;
            _usthCoursesDbContext = usthCoursesDbContext;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        public async Task<RegisterResponseDto> Register(RegisterDto model)
        {
            var role = "SuperAdmin";

            var user = new ApplicationUser
            {
                UserName = model.UserName,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, role);
                await _userManager.AddClaimAsync(user, new Claim("userName", user.UserName));
                await _userManager.AddClaimAsync(user, new Claim("firstName", user.FirstName));
                await _userManager.AddClaimAsync(user, new Claim("lastName", user.LastName));
                await _userManager.AddClaimAsync(user, new Claim("email", user.Email));
                await _userManager.AddClaimAsync(user, new Claim("role", role));

                return new RegisterResponseDto()
                {
                    Email = user.Email,
                    Succeeded = true,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserName = user.UserName,
                };
            }

            return new RegisterResponseDto()
            {
                Succeeded = false,
                Errors = result.Errors
            };
        }

        public bool CheckJwtToken(CheckTokenDto model)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = tokenHandler.ReadJwtToken(model.Token);

            var validTo = jwtSecurityToken.ValidTo;

            return validTo > DateTime.Now;
        }

        public async Task<LoginResponseDto> Info(ClaimsPrincipal claimsPrincipal)
        {
            var user = await _userManager.GetUserAsync(claimsPrincipal);
            var userRole = await _userManager.GetRolesAsync(user);
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            var info = new LoginResponseDto
            {
                Roles = userRole,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Id = user.Id,
                Email = user.Email,
                Avatar = user.Avatar,

            };

            return info;
        }

        public async Task<LoginResponseDto> Login(LoginDto model)
        {

            ApplicationUser applicationUser = _userManager.Users.SingleOrDefault(r => r.UserName == model.Email || r.Email == model.Email);

            if (applicationUser == null)
            {
                throw new Exception("Credentials invalid");
            }

            var userRole = await _userManager.GetRolesAsync(applicationUser);

            var result = await _signInManager.PasswordSignInAsync(applicationUser.UserName, model.Password, false, lockoutOnFailure: true);

            if (result.Succeeded)
            {
                string token = await GenerateJwtToken(model.Email, applicationUser);
                LoginResponseDto response = new LoginResponseDto
                {
                    Token = token,
                    Roles = userRole,
                    FirstName = applicationUser.FirstName,
                    LastName = applicationUser.LastName,
                    Id = applicationUser.Id,
                    Avatar = applicationUser.Avatar,
                };
                return response;
            }

            throw new Exception("Credentials invalid");
        }

        private async Task<string> GenerateJwtToken(string email, ApplicationUser user, IList<string> userRoles = null)
        {
            if (userRoles == null)
            {
                userRoles = await _userManager.GetRolesAsync(user);
            }

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("FirstName", user.FirstName),
                new Claim("LastName", user.LastName)
            };

            claims.AddRange(userRoles.Select(r => new Claim(ClaimTypes.Role, r)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration["JwtIssuer"],
                _configuration["JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}