using System.Collections.Generic;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

using coursesmanagement.Dtos.Student;
using coursesmanagement.Data;
using coursesmanagement.Models;

namespace coursesmanagement.Services
{
    public interface IStudentService
    {
        Task<List<StudentDto>> GetAllForSelector(string search);
        Task<StudentDto> GetById(int id);
    }

    public class StudentService : IStudentService
    {
        private readonly USTHCourseDbContext _context;

        public StudentService(USTHCourseDbContext context)
        {
            _context = context;
        }
        public async Task<List<StudentDto>> GetAllForSelector(string search)
        {
            IQueryable<Student> students = _context.Students.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(search))
            {
                students = students.Where(i => i.User.FirstName.Trim().ToUpper().Contains(search.Trim().ToUpper()) || i.User.LastName.Trim().ToUpper().Contains(search.Trim().ToUpper()));
            }

            List<StudentDto> items = await students.Select(i => new StudentDto
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

        public async Task<StudentDto> GetById(int id)
        {
            Student existingStudent = await _context.Students.AsNoTracking().Include(i => i.User).Where(i => i.Id == id).FirstOrDefaultAsync();

            if (existingStudent == default)
            {
                throw new Exception("Student does not exist");
            }

            return new StudentDto
            {
                Id = existingStudent.Id,
                FirstName = existingStudent.User.FirstName,
                LastName = existingStudent.User.LastName,
                UserName = existingStudent.User.UserName,
                Email = existingStudent.User.Email,
                Gender = existingStudent.User.Gender,
                Avatar = existingStudent.User.Avatar
            };
        }
    }
}