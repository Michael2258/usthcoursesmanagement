using System;

namespace coursesmanagement.Models
{
    public interface IBaseModel
    {
        bool IsDeleted { get; set; }
        DateTime DeletedAt { get; set; }
        DateTime CreatedAt { get; set; }
        DateTime UpdatedAt { get; set; }
    }

    public class BaseModel
    {
        public bool IsDeleted { get; set; }
        public DateTime DeletedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}