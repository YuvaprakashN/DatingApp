using DatingAppProject.Entities;
using DatingAppProject.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DatingAppProject.Data
{
    public class UserRepository:IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<AppUser> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .Include(p=>p.Photos)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<AppUser>> GetMembersAsync()
        {
            return await _context.Users
                .ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
