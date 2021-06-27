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
using coursesmanagement.Dtos.Teacher;

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
                Semester = i.Semester,
                SchoolYear = i.SchoolYear.Year,
                Teacher = new TeacherDto
                {
                    Id = i.Teacher.Id,
                    UserName = i.Teacher.User.UserName,
                    FirstName = i.Teacher.User.FirstName,
                    LastName = i.Teacher.User.LastName,
                    Email = i.Teacher.User.Email,
                    Gender = i.Teacher.User.Gender,
                    Avatar = i.Teacher.User.Avatar
                }
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
                    SchoolYear = item.SchoolYear.Year,
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
                    },
                    Teacher = new TeacherDto
                    {
                        Id = item.Teacher.Id,
                        FirstName = item.Teacher.User.FirstName,
                        LastName = item.Teacher.User.LastName,
                        UserName = item.Teacher.User.UserName,
                        Email = item.Teacher.User.Email,
                        Gender = item.Teacher.User.Gender,
                        Avatar = item.Teacher.User.Avatar
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
            SchoolYear schoolYear = await _context.SchoolYears
                .Include(i => i.Courses)
                .FirstOrDefaultAsync(i => i.Year == model.SchoolYear);

            // check if school year exists
            if (schoolYear == default)
            {
                throw new Exception($"School year {schoolYear.Year} does not exist");
            }


            // one school year cannot has duplicate course
            bool existCourseInSchoolYear = schoolYear.Courses.Any(i => i.Name.Equals(model.Name));


            if (existCourseInSchoolYear)
            {
                throw new Exception("Course already exists.");
            }

            Teacher teacher = await _context.Teachers
                .Include(i => i.User)
                .Where(i => i.Id == model.TeacherId)
                .FirstOrDefaultAsync();

            Course newCourse = new Course
            {
                Name = model.Name,
                Semester = model.Semester,
                SchoolYearId = schoolYear.Id,
                SchoolYear = schoolYear,
                CourseDetail = new CourseDetail
                {
                    Description = model.CourseDetail.Description
                },
                Teacher = teacher
            };

            await _context.Courses.AddAsync(newCourse);
            await _context.SaveChangesAsync();

            return new CourseDto
            {
                Id = newCourse.Id,
                Name = newCourse.Name,
                Semester = newCourse.Semester,
                Teacher = new TeacherDto
                {
                    Id = teacher.Id,
                    FirstName = teacher.User.FirstName,
                    LastName = teacher.User.LastName,
                    Email = teacher.User.Email
                }
            };
        }

        public async Task<CourseDto> Update(int id, CreateUpdateCourseDto model)
        {
            List<Course> courses = await _context.Courses
                .Include(i => i.CourseDetail)
                .Include(i => i.SchoolYear)
                .ToListAsync();

            // fix the logic of checking existing name course
            Course existingCourse = courses.FirstOrDefault(i => i.Id == id);

            if (existingCourse == default)
            {
                throw new Exception("The course does not exist");
            }

            foreach (var course in courses)
            {
                // wrong logic
                // should compare between all the attachment, not attachment name with course name
                bool hasDuplicateAttachedFile = model.CourseDetail.Attachments.Any(i => i.Name.Trim().ToUpper() == course.Name.Trim().ToUpper());

                if (hasDuplicateAttachedFile)
                {
                    throw new Exception("Duplicate attached file name");
                }
            }

            Teacher newTeacher = await _context.Teachers.Include(i => i.User).FirstOrDefaultAsync(i => i.Id == model.TeacherId);

            existingCourse.Semester = model.Semester;
            existingCourse.SchoolYear.Year = model.SchoolYear;
            existingCourse.Teacher = newTeacher;
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
                Teacher = new TeacherDto
                {
                    FirstName = newTeacher.User.FirstName,
                    LastName = newTeacher.User.LastName,
                    Email = newTeacher.User.Email,
                    Gender = newTeacher.User.Gender
                },
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