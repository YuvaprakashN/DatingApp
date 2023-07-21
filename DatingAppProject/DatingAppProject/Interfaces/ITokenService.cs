using DatingAppProject.Entities;

namespace DatingAppProject.Interfaces
{
    public interface ITokenService
    {
        string createToken(AppUser user);
    }
}
