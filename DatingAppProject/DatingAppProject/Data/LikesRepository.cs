using DatingAppProject.DTOs;
using DatingAppProject.Entities;
using DatingAppProject.Extensions;
using DatingAppProject.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DatingAppProject.Data
{
    public class LikesRepository : ILikesRepository
    {

        private readonly DataContext _dataContext;

        public LikesRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<UserLike> GetUserLike(int sourceUserId, int likedUserId)
        {

            return await _dataContext.Likes.FindAsync(sourceUserId, likedUserId);


        }



        public Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId)
        {

            var users = _dataContext.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = _dataContext.Likes.AsQueryable();

            if (predicate== "liked")
            {
                likes = likes.Where(like => like.SourceUserId == userId);
                users = likes.Select(like => like.TargetUser);
            }

            if (predicate== "likedBy")
            {
                likes = likes.Where(like => like.TargetUserId == userId);
                users = likes.Select(like => like.SourceUser);
            }

            var likedUsers = users.Select(user => new LikeDto
            {
                UserName = user.UserName,
                KnownAs = user.KnownAs,
                Age = user.DateOfBirth.CalcuateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain).Url,
                City = user.City,
                Id = user.Id
            });

        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {

            return await _dataContext.Users
                .Include(x => x.LikedUsers)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}
