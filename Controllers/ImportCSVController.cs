using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using coursesmanagement.Services;

namespace coursesmanagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ImportCSVController : ControllerBase
    {
        private readonly IImportGradesService _service;

        public ImportCSVController(IImportGradesService service)
        {
            _service = service;
        }

        [HttpPost]
        public object ImportGradesFile(IFormFile file, [FromQuery] bool isUpdate)
        {
            try
            {
                return _service.ImportGradesFile(file, isUpdate);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}