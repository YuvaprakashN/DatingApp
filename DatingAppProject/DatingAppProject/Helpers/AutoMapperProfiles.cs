using AutoMapper;
using DatingAppProject.DTOs;
using DatingAppProject.Entities;

namespace DatingAppProject.Helpers
{
    public class AutoMapperProfiles :Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>();
               
            CreateMap<Photo, PhotoDto>();
        }
    }
}
