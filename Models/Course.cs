using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace coursesmanagement.Models
{
    public class Course : BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Semester { get; set; }
        [Required]
        public int SchoolYearId { get; set; }
        public SchoolYear SchoolYear { get; set; }
        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }
        public virtual CourseDetail CourseDetail { get; set; }
    }
}