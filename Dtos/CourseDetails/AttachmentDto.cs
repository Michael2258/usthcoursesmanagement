namespace coursesmanagement.Dtos.CourseDetails
{
    public class AttachmentDto : IResponseDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Key { get; set; }
    }
}