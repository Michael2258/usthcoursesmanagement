namespace coursesmanagement.Models
{
    public class CourseDetail : BaseModel
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public virtual Course Course { get; set; }
    }
}