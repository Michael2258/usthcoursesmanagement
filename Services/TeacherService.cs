using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

using coursesmanagement.Dtos;
using coursesmanagement.Dtos.Teacher;
using coursesmanagement.Data;
using coursesmanagement.Models;

namespace coursesmanagement.Services
{
    public interface ITeacherService
    {
        Task<List<TeacherDto>> GetTeacherForSelector(string search);
        Task<TeacherDto> GetById(int id);
    }

    public class TeacherService : ITeacherService
    {
        private readonly USTHCourseDbContext _context;

        public TeacherService(USTHCourseDbContext context)
        {
            _context = context;
        }
        public async Task<List<TeacherDto>> GetTeacherForSelector(string search)
        {
            IQueryable<Teacher> teachers = _context.Teachers.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(search))
            {
                teachers = teachers.Where(i => i.User.FirstName.Trim().ToUpper().Contains(search.Trim().ToUpper()) || i.User.LastName.Trim().ToUpper().Contains(search.Trim().ToUpper()));
            }

            int totalItems = teachers.Count();

            List<TeacherDto> items = await teachers.Select(i => new TeacherDto
            {
                Id = i.Id,
                FirstName = i.User.FirstName,
                LastName = i.User.LastName,
                UserName = i.User.UserName,
                Email = i.User.Email,
                Gender = i.User.Gender,
                Avatar = i.User.Avatar
            }).ToListAsync();

            return items;
        }

        public async Task<TeacherDto> GetById(int id)
        {
            Teacher existingTeacher = await _context.Teachers.Include(i => i.User).FirstOrDefaultAsync(i => i.Id == id);

            if (existingTeacher == default)
            {
                throw new Exception("Teacher does not exist");
            }

            return new TeacherDto
            {
                Id = existingTeacher.Id,
                FirstName = existingTeacher.User.FirstName,
                LastName = existingTeacher.User.LastName,
                UserName = existingTeacher.User.UserName,
                Email = existingTeacher.User.Email,
                Gender = existingTeacher.User.Gender,
                Avatar = existingTeacher.User.Avatar
            };
        }
    }
}