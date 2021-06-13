using System.Collections.Generic;
using System;
using System.IO;

namespace coursesmanagement.Dtos.Files
{
    public static class FileHelpers
    {
        public static string GetContentType(string path)
        {
            var ext = Path.GetExtension(path).ToLowerInvariant();
            var supported = FileConstants.SupportedTypes.TryGetValue(ext, out var mimeType);
            return !supported ? null : mimeType;
        }
    }
}