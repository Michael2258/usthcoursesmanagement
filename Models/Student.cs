namespace coursesmanagement.Models
{
    public class Student : BaseModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

    }
}