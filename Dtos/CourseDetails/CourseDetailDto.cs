
namespace coursesmanagement.Dtos.CourseDetails
{
    public class CourseDetailDto : IResponseDto
    {
        public int? Id { get; set; }
        public int? CourseId { get; set; }
        public string Description { get; set; }
        public AttachmentDto[] Attachments { get; set; }
    }
}