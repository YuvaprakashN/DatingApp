using AutoMapper;
using DatingAppProject.Data;
using DatingAppProject.DTOs;
using DatingAppProject.Entities;
using DatingAppProject.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;
using System.Security.Cryptography;
using System.Text;

namespace DatingAppProject.Controllers
{
    [AllowAnonymous]
    public class AccountController : BaseApiController
    {
        private DataContext _context;
        private ITokenService _tokenService;
        private IMapper _mapper;
        public AccountController(DataContext context,ITokenService token,IMapper mapper)
        {

            _context = context;
            _tokenService=token;
            _mapper = mapper;   

        }

        [HttpPost("register")] // POST: api/account/register?username=dave&password=pwd
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

           var user= _mapper.Map<AppUser>(registerDto);
            using var hmac = new HMACSHA512();


            user.UserName = registerDto.Username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
                user.PasswordSalt = hmac.Key;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                KnownAs=user.KnownAs
            }; 
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> login (LoginDto login)
        {
            var user = await _context.Users.Include(p => p.Photos).SingleOrDefaultAsync(u => u.UserName == login.UserNAme);
            if (user == null) return Unauthorized("Invalid UserName");
            using var hmac = new HMACSHA512(user.PasswordSalt);

            byte[] computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));
            for (int i = 0; i < computeHash.Length; i++)
            {
                if (computeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");

            }
            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAs
            };
        }


        private async Task<bool> UserExists(String userName)
        {
            return await _context.Users.AnyAsync(u => u.UserName == userName.ToLower());
        }




    }
}
