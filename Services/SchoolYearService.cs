using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using coursesmanagement.Dtos;
using coursesmanagement.Data;
using coursesmanagement.Dtos.SchoolYear;
using coursesmanagement.Models;
using coursesmanagement.Dtos.Courses;

namespace coursesmanagement.Services
{
    public interface ISchoolYearService
    {
        Task<PagedResponseDto<SchoolYearDto>> Get(int page, int limit, string search);

        Task<SchoolYearDto> GetById(int id);
        Task<SchoolYearDto> Create(CreateUpdateSchoolYearDto model);
        Task<SchoolYearDto> Update(int id, CreateUpdateSchoolYearDto model);
        Task Remove(int id);
    }

    public class SchoolYearService : ISchoolYearService
    {
        private readonly USTHCourseDbContext _context;

        public SchoolYearService(USTHCourseDbContext context)
        {
            _context = context;
        }

        public async Task<PagedResponseDto<SchoolYearDto>> Get(int page, int limit, string search)
        {
            IQueryable<SchoolYear> schoolYears = _context.SchoolYears.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(search))
            {
                schoolYears = schoolYears.Where(i => i.Year.Trim().ToUpper().Contains(search.Trim().ToUpper()));
            }

            if (page == default || limit == default)
            {
                throw new Exception("Page and Limit is required.");
            }

            int startRow = (page - 1) * limit;
            int totalItems = schoolYears.Count();

            schoolYears = schoolYears.OrderBy(i => i.Year)
                .Skip(startRow)
                .Take(limit);

            List<SchoolYearDto> items = await schoolYears.Select(schoolYear => new SchoolYearDto
            {
                Id = schoolYear.Id,
                Year = schoolYear.Year,
                NumberOfCourses = schoolYear.SchoolYearCourses.Count,
                Courses = schoolYear.SchoolYearCourses.Select(i => new CourseDto
                {
                    Id = i.Course.Id,
                    Name = i.Course.Name,
                    Semester = i.Course.Semester
                })
            }).ToListAsync();

            PagedResponseDto<SchoolYearDto> result = new PagedResponseDto<SchoolYearDto>
            {
                Page = page,
                Limit = limit,
                TotalItems = totalItems,
                TotalPages = (int)Math.Ceiling(totalItems / (double)limit),
                Items = items
            };

            return result;
        }

        public async Task<SchoolYearDto> GetById(int id)
        {
            SchoolYearDto item = await _context.SchoolYears.AsNoTracking().Select(item => new SchoolYearDto
            {
                Id = item.Id,
                Year = item.Year,
                Courses = item.SchoolYearCourses.Select(course => new CourseDto()
                {
                    Id = course.Course.Id,
                    Name = course.Course.Name,
                    Semester = course.Course.Semester
                })
            }).FirstOrDefaultAsync(q => q.Id == id);

            return item;
        }

        public async Task<SchoolYearDto> Create(CreateUpdateSchoolYearDto model)
        {
            var exist = await _context.SchoolYears.AsNoTracking().AnyAsync(i => i.Year.Equals(model.Year));

            if (exist)
            {
                throw new Exception("Year already exists");
            }

            SchoolYear newSchoolYear = new SchoolYear
            {
                Year = model.Year,
                SchoolYearCourses = model.CourseIds.Select(id => new SchoolYearCourse
                {
                    CourseId = id
                }).ToList()
            };

            await _context.SchoolYears.AddAsync(newSchoolYear);
            await _context.SaveChangesAsync();

            return new SchoolYearDto
            {
                Id = newSchoolYear.Id,
                Year = newSchoolYear.Year,
                Courses = newSchoolYear.SchoolYearCourses.Select(course => new CourseDto
                {
                    Id = course.CourseId
                })
            };
        }

        public async Task<SchoolYearDto> Update(int id, CreateUpdateSchoolYearDto model)
        {
            var existingSchoolYear = await _context.SchoolYears.Include(i => i.SchoolYearCourses).FirstOrDefaultAsync(q => q.Id == id);

            if (existingSchoolYear == default)
            {
                throw new Exception("The school year doesn't exist");
            }

            existingSchoolYear.Year = model.Year;
            existingSchoolYear.SchoolYearCourses = model.CourseIds.Select(i => new SchoolYearCourse
            {
                CourseId = i
            }).ToList();

            await _context.SaveChangesAsync();

            return new SchoolYearDto
            {
                Id = existingSchoolYear.Id,
                Year = existingSchoolYear.Year,
                Courses = existingSchoolYear.SchoolYearCourses.Select(i => new CourseDto()
                {
                    Id = i.CourseId
                })
            };
        }

        public async Task Remove(int id)
        {
            var existingSchoolYear = await _context.SchoolYears.FirstOrDefaultAsync(i => i.Id == id);

            if (existingSchoolYear == default)
            {
                throw new Exception("School year doesn't exist.");
            }

            _context.SchoolYears.Remove(existingSchoolYear);

            await _context.SaveChangesAsync();
        }
    }
}