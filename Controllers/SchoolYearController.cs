using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using coursesmanagement.Dtos.SchoolYear;
using coursesmanagement.Services;

namespace coursesmanagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SchoolYearController : ControllerBase
    {
        private readonly ISchoolYearService _schoolYearService;

        public SchoolYearController(ISchoolYearService schoolYearService)
        {
            _schoolYearService = schoolYearService;
        }

        [HttpGet]
        [Authorize]
        public async Task<object> Get([FromQuery] int page, [FromQuery] int limit, [FromQuery] string search)
        {
            try
            {
                return await _schoolYearService.Get(page, limit, search);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<object> GetById(int id)
        {
            try
            {
                return await _schoolYearService.GetById(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<object> Create([FromBody] CreateUpdateSchoolYearDto model)
        {
            try
            {
                return await _schoolYearService.Create(model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<object> Update(int id, CreateUpdateSchoolYearDto model)
        {
            try
            {
                return await _schoolYearService.Update(id, model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<object> Remove(int id)
        {
            try
            {
                await _schoolYearService.Remove(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}