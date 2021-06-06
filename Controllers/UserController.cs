using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using coursesmanagement.Services;
using coursesmanagement.Dtos.User;

namespace coursesmanagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Authorize]
        public object Get([FromQuery] int page, [FromQuery] int limit, [FromQuery] string search)
        {
            try
            {
                return _userService.Get(page, limit, search);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<object> GetById(string id)
        {
            try
            {
                return await _userService.GetById(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<object> Create([FromBody] UserCreateUpdateDto model)
        {
            try
            {
                return await _userService.Create(model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<object> Update(string id, [FromBody] UserCreateUpdateDto model)
        {
            try
            {
                return await _userService.Update(id, model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<object> Remove(string id)
        {
            try
            {
                await _userService.Remove(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}