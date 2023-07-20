using DatingAppProject.Data;
using DatingAppProject.DTOs;
using DatingAppProject.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;
using System.Security.Cryptography;
using System.Text;

namespace DatingAppProject.Controllers
{
    public class AccountController : BaseApiController
    {
        private DataContext _context;

        public AccountController(DataContext context)
        {

            _context = context;

        }

        [HttpPost("register")] // POST: api/account/register?username=dave&password=pwd
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.UserNAme)) return BadRequest("Username is taken");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDto.UserNAme.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }


        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> login (LoginDto login)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == login.UserNAme);
            if (user == null) return Unauthorized("Invalid UserName");
            using var hmac = new HMACSHA512(user.PasswordSalt);

            byte[] computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));
            for (int i = 0; i < computeHash.Length; i++)
            {
                if (computeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");

            }
            return user;
        }


        private async Task<bool> UserExists(String userName)
        {
            return await _context.Users.AnyAsync(u => u.UserName == userName.ToLower());
        }




    }
}
