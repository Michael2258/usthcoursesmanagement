
namespace coursesmanagement.Dtos.CourseDetails
{
    public class CourseDetailUpdateDto : IRequestDto
    {
        public string Description { get; set; }
        public AttachmentDto[] Attachments { get; set; }
    }
}