using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using coursesmanagement.Dtos.Courses;
using coursesmanagement.Services;

namespace coursesmanagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet]
        [Authorize]
        public async Task<object> Get([FromQuery] int page, [FromQuery] int limit, [FromQuery] string search)
        {
            try
            {
                return await _courseService.Get(page, limit, search);
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
                return await _courseService.GetById(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<object> Create([FromBody] CreateUpdateCourseDto model)
        {
            try
            {
                return await _courseService.Create(model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<object> Update(int id, CreateUpdateCourseDto model)
        {
            try
            {
                return await _courseService.Update(id, model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("remove-course/{id}")]
        [Authorize]
        public async Task<object> Remove([FromRoute] int id)
        {
            try
            {
                await _courseService.Remove(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("remove-attached-file/{attachedId}")]
        [Authorize]
        public async Task<object> RemoveAttachedFile([FromRoute] int attachedId)
        {
            try
            {
                await _courseService.RemoveAttachedFile(attachedId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("grades/{id}")]
        [Authorize]
        public object GetCourseGrades([FromRoute] int id)
        {
            try
            {
                var result = _courseService.GetCourseGrades(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}