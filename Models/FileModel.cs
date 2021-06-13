using Microsoft.AspNetCore.Http;

namespace coursesmanagement.Models
{
    public class FileModel
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
    }
}