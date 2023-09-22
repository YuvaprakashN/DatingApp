using DatingAppProject.DTOs;
using DatingAppProject.Entities;
using DatingAppProject.Helpers;

namespace DatingAppProject.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int likedUserId);
        Task<AppUser> GetUserWithLikes(int userId);
        Task<IEnumerable<LikeDto>> GetUserLikes(string predicate,int userId);
    }
}
