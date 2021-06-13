using System.IO;
using Microsoft.AspNetCore.Http;

namespace coursesmanagement.Dtos.Files
{
    public class FileDto
    {
        public class FileResult
        {
            public string Name { get; set; }
            public string Key { get; set; }
            public string Type { get; set; }
        }
        public class DownloadObject
        {
            public MemoryStream Memory { get; set; }
            public string ContentType { get; set; }
            public string Name { get; set; }
        }

    }

}