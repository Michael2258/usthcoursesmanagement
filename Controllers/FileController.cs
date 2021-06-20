using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using coursesmanagement.Dtos.Files;
using coursesmanagement.Services;

namespace coursesmanagement.Controllers
{
    [Route("api/file")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        /// <summary>Upload course book to AWS S3</summary>
        [HttpPost, DisableRequestSizeLimit]
        [Route("system/coursebook")]
        public async Task<IActionResult> CourseBookUpload(IFormFile file)
        {
            try
            {
                String prefix = "system/coursebook";
                FileDto.FileResult result = await _fileService.UploadFile(prefix, file);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>Upload slides to AWS S3</summary>
        [HttpPost, DisableRequestSizeLimit]
        [Route("system/slides")]
        public async Task<IActionResult> SlideUpload(IFormFile file)
        {
            try
            {
                String prefix = "system/slides";
                FileDto.FileResult result = await _fileService.UploadFile(prefix, file);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>Download file to local</summary>
        [HttpGet]
        [Route("download")]
        public async Task<IActionResult> DownloadFile([FromQuery] string key)
        {
            FileDto.DownloadObject downloader = await _fileService.DownloadFile(key);

            return File(downloader.Memory, downloader.ContentType, downloader.Name);
        }

        /// <summary>Delete file</summary>
        [HttpDelete]
        [Route("remove-file")]
        public async Task<IActionResult> RemoveFile([FromQuery] string key)
        {
            await _fileService.RemoveFile(key);
            return Ok();
        }
    }
}