using System.Collections.Generic;
using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using coursesmanagement.Data;
using coursesmanagement.Models;
using coursesmanagement.Dtos.Grades;

namespace coursesmanagement.Services
{
    public interface IImportGradesService
    {
        Task ImportGradesFile(IFormFile file, bool isUpdate);
    }
    public class ImportGradesService : IImportGradesService
    {
        private readonly USTHCourseDbContext _context;

        public ImportGradesService(USTHCourseDbContext context)
        {
            _context = context;
        }

        public async Task ImportGradesFile(IFormFile file, bool isUpdate)
        {

            IQueryable<Course> courses = _context.Courses;
            IQueryable<ImportGrades> courseGrades = _context.ImportGrades;

            using (var streamReader = new StreamReader(file.OpenReadStream()))
            {
                string[] headers = streamReader.ReadLine().Trim().Split(',');

                if (headers[0] != "CourseName" ||
                    headers[1] != "StudentId" ||
                    headers[2] != "FirstName" ||
                    headers[3] != "LastName" ||
                    headers[4] != "Attendance" ||
                    headers[5] != "MidtermTest" ||
                    headers[6] != "FinalTest" ||
                    headers[7] != "FinalResult")
                {
                    throw new Exception("Imported CSV file format is incorrect.");
                }

                while (!streamReader.EndOfStream)
                {
                    string[] rows = streamReader.ReadLine().Split(",");

                    if (string.IsNullOrWhiteSpace(rows[0]) ||
                        string.IsNullOrWhiteSpace(rows[1]) ||
                        string.IsNullOrWhiteSpace(rows[2]) ||
                        string.IsNullOrWhiteSpace(rows[3]) ||
                        string.IsNullOrWhiteSpace(rows[4]) ||
                        string.IsNullOrWhiteSpace(rows[5]) ||
                        string.IsNullOrWhiteSpace(rows[6]) ||
                        string.IsNullOrWhiteSpace(rows[7]))
                    {
                        throw new Exception("Null or white space are not excepted. Please check again!");
                    }

                    if (!isGradeValid(rows[4]) ||
                        !isGradeValid(rows[5]) ||
                        !isGradeValid(rows[6]) ||
                        !isGradeValid(rows[7]))
                    {
                        throw new Exception("Grades are supposed to be smaller than 20 and greater than 0. Please check again!");
                    }

                    Course existingCourse = await courses
                        .FirstOrDefaultAsync(i => i.Name.Trim().ToUpper() == rows[0].Trim().ToUpper());

                    if (existingCourse == default)
                    {
                        throw new Exception($"Course {rows[0]} does not exist");
                    }

                    ImportGrades existingStudent = courseGrades
                        .Where(i => i.CourseName.Trim().ToUpper() == rows[0].Trim().ToUpper())
                        .FirstOrDefault(i => i.StudentId.Trim().ToUpper() == rows[1].Trim().ToUpper());

                    if (!(existingStudent == default))
                    {
                        if (!isUpdate)
                        {
                            throw new Exception("Duplicate student in imported file. Please check again!");
                        }

                        else
                        {
                            existingStudent.CourseName = rows[0];
                            existingStudent.StudentId = rows[1];
                            existingStudent.FirstName = rows[2];
                            existingStudent.LastName = rows[3];
                            existingStudent.Attendance = double.Parse(rows[4]);
                            existingStudent.MidtermTest = double.Parse(rows[5]);
                            existingStudent.FinalTest = double.Parse(rows[6]);
                            existingStudent.FinalResult = double.Parse(rows[7]);
                        };
                    }

                    else
                    {
                        var newImportGrades = new ImportGrades
                        {
                            CourseName = rows[0],
                            StudentId = rows[1],
                            FirstName = rows[2],
                            LastName = rows[3],
                            Attendance = double.Parse(rows[4]),
                            MidtermTest = double.Parse(rows[5]),
                            FinalTest = double.Parse(rows[6]),
                            FinalResult = double.Parse(rows[7])
                        };

                        await _context.ImportGrades.AddAsync(newImportGrades);
                    }
                }

                await _context.SaveChangesAsync();
            }
        }

        private bool isGradeValid(string gradeString)
        {
            double grade = double.Parse(gradeString);

            if (grade > 20 || grade < 0)
            {
                return false;
            }

            return true;
        }
    }
}