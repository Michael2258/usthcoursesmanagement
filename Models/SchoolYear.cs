using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
namespace coursesmanagement.Models
{
    public class SchoolYear : BaseModel
    {
        public int Id { get; set; }
        [Required]
        public string Year { get; set; }
        public virtual ICollection<SchoolYearCourse> SchoolYearCourses { get; set; }
    }
}