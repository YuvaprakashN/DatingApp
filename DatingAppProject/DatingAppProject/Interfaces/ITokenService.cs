using DatingAppProject.Entities;

namespace DatingAppProject.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
