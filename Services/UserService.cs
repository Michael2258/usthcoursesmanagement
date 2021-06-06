using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using coursesmanagement.Dtos;
using coursesmanagement.Dtos.User;
using coursesmanagement.Data;
using coursesmanagement.Models;
using coursesmanagement.Helpers;

namespace coursesmanagement.Services
{
    public interface IUserService
    {
        PagedResponseDto<UserDto> Get(int page, int limit, string search);
        Task<UserDto> GetById(string id);
        Task<UserDto> Create(UserCreateUpdateDto model);
        Task<UserDto> Update(string id, UserCreateUpdateDto model);
        Task Remove(string id);
    }

    public class UserService : IUserService
    {
        private readonly USTHCourseDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private const string DefaultPassword = "Asdfgh1@3";
        public UserService(USTHCourseDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public PagedResponseDto<UserDto> Get(int page, int limit, string search)
        {
            IQueryable<ApplicationUser> users = _context.Users.AsNoTracking();


            if (!string.IsNullOrWhiteSpace(search))
            {
                users = users.Where(i => i.FullName.Trim().ToUpper().Contains(search.Trim().ToUpper()));
            }

            if (page == default || limit == default)
            {
                throw new Exception("Page and Limit is required.");
            }

            int startRow = (page - 1) * limit;
            int totalItems = users.Count();

            var allRoles = _roleManager.Roles.ToList();

            users = users.OrderBy(i => i.FullName)
                .Skip(startRow)
                .Take(limit);

            List<UserDto> items = users.Select(user => new UserDto
            {
                Id = user.Id,
                LastName = user.LastName,
                FirstName = user.FirstName,
                FullName = user.FullName,
                Email = user.Email,
                UserName = user.UserName,
                Roles = user.Roles.Select(i => i.RoleId).ToList()
            }).ToList();

            foreach (var user in items)
            {
                user.Roles = user.Roles.Select(i => allRoles.First(role => role.Id == i).Name).ToList();
            }

            PagedResponseDto<UserDto> result = new PagedResponseDto<UserDto>
            {
                Page = page,
                Limit = limit,
                TotalItems = totalItems,
                TotalPages = (int)Math.Ceiling(totalItems / (double)limit),
                Items = items
            };

            return result;
        }

        public async Task<UserDto> GetById(string id)
        {

            var allRoles = _roleManager.Roles.ToList();

            UserDto user = await _context.Users.AsNoTracking().Select(user => new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Email = user.Email,
                Gender = user.Gender,
                Roles = user.Roles.Select(i => i.RoleId).ToList(),
                DateOfBirth = user.DateOfBirth,
                Avatar = user.Avatar
            })
            .FirstOrDefaultAsync(i => i.Id == id);

            user.Roles = user.Roles.Select(i => allRoles.First(role => role.Id == i).Name).ToList();

            if (user == default)
            {
                throw new Exception("User doesn't exist.");
            }

            return user;
        }

        public async Task<UserDto> Create(UserCreateUpdateDto model)
        {

            bool duplicateFirstName = _context.Users.AsNoTracking().Any(i => i.FirstName.Trim().ToUpper() == model.FirstName.Trim().ToUpper());

            bool duplicateLastName = _context.Users.AsNoTracking().Any(i => i.LastName.Trim().ToUpper() == model.LastName.Trim().ToUpper());

            bool duplicateName = duplicateFirstName && duplicateLastName;

            bool duplicateUserName = _context.Users.AsNoTracking()
            .Any(i => i.UserName.Trim().ToUpper() == model.UserName.Trim().ToUpper());

            bool duplicateEmail = _context.Users.AsNoTracking().Any(i => i.Email.Trim().ToUpper() == model.Email.Trim().ToUpper());

            string[] listCheckEmpty = new string[] {
                model.FirstName,
                model.LastName,
                model.UserName,
                model.Email
            };

            bool passedCheckEmpty = Utils.CheckEmptyStrings(listCheckEmpty);

            if (!passedCheckEmpty) throw new Exception("Please fill in all require fields");

            if (duplicateUserName) throw new Exception("Duplicate user name");
            if (duplicateEmail) throw new Exception("Duplicate email");
            if (duplicateName) throw new Exception("Duplicate name");

            var password = DefaultPassword;

            ApplicationUser newUser = new ApplicationUser
            {
                CreatedAt = DateTime.UtcNow,
                FirstName = model.FirstName,
                LastName = model.LastName,
                FullName = $"{model.FirstName} {model.LastName}",
                Email = model.Email,
                UserName = model.UserName,
                DateOfBirth = model.DateOfBirth,
                Gender = model.Gender,
                Avatar = model.Avatar
            };

            var result = await _userManager.CreateAsync(newUser, password);

            if (!result.Succeeded)
            {
                throw new Exception($"Could not create user. {string.Join('|', result.Errors.Select(i => i.Description))}");
            }

            var addToRoleResult = await _userManager.AddToRolesAsync(newUser, model.Roles);

            if (!addToRoleResult.Succeeded)
            {
                throw new Exception($"Could not add user to role. {string.Join('|', addToRoleResult.Errors.Select(i => i.Description))}");
            }

            await _context.SaveChangesAsync();

            var userRole = await _userManager.GetRolesAsync(newUser);

            return new UserDto
            {
                Id = newUser.Id,
                FullName = newUser.FullName,
                LastName = newUser.LastName,
                FirstName = newUser.FirstName,
                UserName = newUser.UserName,
                Email = newUser.Email,
                Gender = newUser.Gender,
                DateOfBirth = newUser.DateOfBirth,
                Roles = userRole
            };
        }

        public async Task<UserDto> Update(string id, UserCreateUpdateDto model)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(i => i.Id == id);

            if (existingUser == default)
            {
                throw new Exception("User doesn't exist");
            }

            existingUser.FirstName = model.FirstName;
            existingUser.LastName = model.LastName;
            existingUser.UserName = model.UserName;
            existingUser.Gender = model.Gender;
            existingUser.DateOfBirth = model.DateOfBirth;
            existingUser.Email = model.Email;
            existingUser.Avatar = model.Avatar;

            await _context.SaveChangesAsync();

            return new UserDto
            {
                Id = existingUser.Id,
                FirstName = existingUser.FirstName,
                LastName = existingUser.LastName,
                Email = existingUser.Email
            };
        }

        public async Task Remove(string id)
        {
            var existingModel = await _context.Users.FirstOrDefaultAsync(i => i.Id == id);

            if (existingModel == default)
            {
                throw new Exception("User doesn't exist");
            }

            _context.Remove(existingModel);

            await _context.SaveChangesAsync();
        }

    }
}