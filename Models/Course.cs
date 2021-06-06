using System.Collections.Generic;
namespace coursesmanagement.Models
{
    public class Course : BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Semester { get; set; }
    }
}