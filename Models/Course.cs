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
        public int NumYear { get; set; }
        public int Department { get; set; }
        public SchoolYear SchoolYear { get; set; }
        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }
        public virtual CourseDetail CourseDetail { get; set; }
    }

    public enum NumYears
    {
        FirstYear,
        SecondYear,
        ThirdYear
    }

    public enum Departments
    {
        AE,
        AES,
        AM,
        AMEO,
        AMSN,
        CHE,
        CS,
        DS,
        EER,
        EPE,
        FST,
        ICT,
        MET,
        MST,
        PMAB,
        SSST,
    }
}