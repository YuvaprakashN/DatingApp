using DatingAppProject.Data;
using DatingAppProject.Entities;
using DatingAppProject.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingAppProject.Controllers
{
    /*[ApiController]
    [Route("api/[controller]")] // GET /api/users*/
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return Ok( await _userRepository.GetMembersAsync());

        }

        [HttpGet("{username}")]

        public async Task<ActionResult<AppUser>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }
    }
}