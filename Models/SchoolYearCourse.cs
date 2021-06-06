using System.ComponentModel.DataAnnotations;

namespace coursesmanagement.Models
{
    public class SchoolYearCourse
    {
        public virtual int SchoolYearId { get; set; }
        public virtual SchoolYear SchoolYear { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
    }
}