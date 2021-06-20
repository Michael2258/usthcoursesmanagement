using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace coursesmanagement.Models
{
    public class CourseDetail : BaseModel
    {
        public int Id { get; set; }
        [Required]
        public int CourseId { get; set; }
        public string Description { get; set; }
        public ICollection<Attachment> Attachments { get; set; }
        public virtual Course Course { get; set; }
    }

    public class Attachment
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Name { get; set; }
        public UploadedFileType UploadedFileType { get; set; }
        public int CourseDetailId { get; set; }
        public virtual CourseDetail CourseDetail { get; set; }
    }

    public enum UploadedFileType
    {
        Slide,
        Coursebook
    }
}