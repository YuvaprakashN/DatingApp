﻿using AutoMapper;
using DatingAppProject.Data;
using DatingAppProject.DTOs;
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
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository,IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();
            var userToReturn=_mapper.Map<IEnumerable<MemberDto>>(users);

            return Ok(userToReturn);

        }

        [HttpGet("{username}")]

        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user =await _userRepository.GetMemberAsync(username);
            return  _mapper.Map<MemberDto>(user);
        }
    }
}