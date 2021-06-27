using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;

namespace coursesmanagement.Models
{
    public class Teacher : BaseModel
    {
        public int Id { get; set; }
        [Required]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public ICollection<Course> Courses { get; set; }

    }
}