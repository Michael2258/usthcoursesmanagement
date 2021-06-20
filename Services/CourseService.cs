using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using coursesmanagement.Dtos.Courses;
using coursesmanagement.Dtos;
using coursesmanagement.Dtos.CourseDetails;
using coursesmanagement.Models;
using coursesmanagement.Data;

namespace coursesmanagement.Services
{
    public interface ICourseService
    {
        Task<PagedResponseDto<CourseDto>> Get(int page, int limit, string search);
        Task<CourseDto> GetById(int id);
        Task<CourseDto> Create(CreateUpdateCourseDto model);
        Task<CourseDto> Update(int id, CreateUpdateCourseDto model);
        Task Remove(int id);
        Task RemoveAttachedFile(int attachedId);
    }

    public class CourseService : ICourseService
    {
        private readonly USTHCourseDbContext _context;

        public CourseService(USTHCourseDbContext context)
        {
            _context = context;
        }

        public async Task<PagedResponseDto<CourseDto>> Get(int page, int limit, string search)
        {
            IQueryable<Course> courses = _context.Courses.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(search))
            {
                courses = courses.Where(i => i.Name.Trim().ToUpper().Contains(search.Trim().ToUpper()));
            }

            if (page == default || limit == default)
            {
                throw new Exception("Page and Limit is required.");
            }

            int startRow = (page - 1) * limit;
            int totalItems = courses.Count();

            courses = courses
                .OrderBy(i => i.Name)
                .Skip(startRow)
                .Take(limit);

            List<CourseDto> items = await courses.Select(i => new CourseDto
            {
                Id = i.Id,
                Name = i.Name,
                Semester = i.Semester
            }).ToListAsync();

            PagedResponseDto<CourseDto> result = new PagedResponseDto<CourseDto>
            {
                Page = page,
                Limit = limit,
                TotalItems = totalItems,
                TotalPages = (int)Math.Ceiling(totalItems / (double)limit),
                Items = items
            };

            return result;
        }

        public async Task<CourseDto> GetById(int id)
        {

            CourseDto item = await _context.Courses
                .AsNoTracking()
                .Select(item => new CourseDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Semester = item.Semester,
                    CourseDetail = new CourseDetailDto
                    {
                        Id = item.CourseDetail.Id,
                        CourseId = item.Id,
                        Description = item.CourseDetail.Description,
                        Attachments = item.CourseDetail.Attachments.Select(i => new AttachmentDto
                        {
                            Id = i.Id,
                            Name = i.Name,
                            Key = i.Key,
                            UploadedFileType = (int)i.UploadedFileType
                        }).ToArray()
                    }
                })
                .FirstOrDefaultAsync(q => q.Id == id);

            if (item == default)
            {
                throw new Exception($"Course with id {id} does not exist");
            }

            return item;
        }

        public async Task<CourseDto> Create(CreateUpdateCourseDto model)
        {
            var exist = await _context.Courses
                .AsNoTracking()
                .AnyAsync(i => i.Name.Equals(model.Name));

            if (exist)
            {
                throw new Exception("Course already exists.");
            }

            Course newCourse = new Course
            {
                Name = model.Name,
                Semester = model.Semester,
                CourseDetail = new CourseDetail
                {
                    Description = model.CourseDetail.Description
                }
            };

            await _context.Courses.AddAsync(newCourse);
            await _context.SaveChangesAsync();

            return new CourseDto
            {
                Id = newCourse.Id,
                Name = newCourse.Name,
                Semester = newCourse.Semester
            };
        }

        public async Task<CourseDto> Update(int id, CreateUpdateCourseDto model)
        {
            List<Course> courses = await _context.Courses
                .Include(i => i.CourseDetail)
                .ToListAsync();

            Course existingCourse = courses.FirstOrDefault(i => i.Id == id);

            if (existingCourse == default)
            {
                throw new Exception("The course does not exist");
            }

            foreach (var course in courses)
            {
                bool hasDuplicateAttachedFile = model.CourseDetail.Attachments.Any(i => i.Name.Trim().ToUpper() == course.Name.Trim().ToUpper());

                if (hasDuplicateAttachedFile)
                {
                    throw new Exception("Duplicate attached file name");
                }
            }

            existingCourse.Semester = model.Semester;
            existingCourse.CourseDetail.Description = model.CourseDetail.Description;
            existingCourse.CourseDetail.Attachments = model.CourseDetail.Attachments.Select(i => new Attachment
            {
                Id = i.Id ?? default,
                Name = i.Name,
                Key = i.Key,
                UploadedFileType = (UploadedFileType)i.UploadedFileType
            }).ToArray();

            await _context.SaveChangesAsync();

            return new CourseDto
            {
                Id = existingCourse.Id,
                Name = existingCourse.Name,
                Semester = existingCourse.Semester,
                CourseDetail = new CourseDetailDto
                {
                    Description = existingCourse.CourseDetail.Description,
                    Attachments = existingCourse.CourseDetail.Attachments.Select(i => new AttachmentDto
                    {
                        Id = i.Id,
                        Name = i.Name,
                        Key = i.Key,
                        UploadedFileType = (int)i.UploadedFileType
                    }).ToArray()
                }
            };
        }

        // remove course
        public async Task Remove(int id)
        {
            var existingCourse = await _context.Courses.FirstOrDefaultAsync(i => i.Id == id);

            if (existingCourse == default)
            {
                throw new Exception("The course does not exist.");
            }

            _context.Courses.Remove(existingCourse);
            await _context.SaveChangesAsync();
        }

        // remove attached file
        public async Task RemoveAttachedFile(int attachedId)
        {
            Attachment existingAttachedFile = await _context.Attachments
                .FirstOrDefaultAsync(i => i.Id == attachedId);

            if (existingAttachedFile == default)
            {
                throw new Exception("File does not exist");
            }

            _context.Remove(existingAttachedFile);
            await _context.SaveChangesAsync();


        }
    }
}