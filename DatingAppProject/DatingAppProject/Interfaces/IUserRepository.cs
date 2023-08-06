﻿using DatingAppProject.Entities;

namespace DatingAppProject.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<IEnumerable<AppUser>> GetMembersAsync();
        Task<AppUser> GetMemberAsync(string username);
    }
}
