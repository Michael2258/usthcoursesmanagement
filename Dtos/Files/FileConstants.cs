using System.Collections.Generic;
namespace coursesmanagement.Dtos.Files
{
    public static class FileConstants
    {
        public static readonly Dictionary<string, string> SupportedTypes = new Dictionary<string, string>
        {
            {".txt", "text/plain"},
            {".pdf", "application/pdf"},
            {".doc", "application/vnd.ms-word"},
            {".docx", "application/vnd.ms-word"},
            {".xls", "application/vnd.ms-excel"},
            {".png", "image/png"},
            {".jpg", "image/jpeg"},
            {".jpeg", "image/jpeg"},
            {".gif", "image/gif"},
            {".mp3", "audio/mpeg"},
            {".wav", "audio/wav"},
            {".mp4", "video/mp4"},
            {".mp4v", "video/mp4"},
            {".csv", "text/csv"}
        };
    }
}