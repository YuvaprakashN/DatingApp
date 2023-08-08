using AutoMapper;
using DatingAppProject.DTOs;
using DatingAppProject.Entities;
using DatingAppProject.Extensions;

namespace DatingAppProject.Helpers
{
    public class AutoMapperProfiles :Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                 .ForMember(dest => dest.PhotoUrl, opt =>
                opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                 .ForMember(dest=>dest.Age, opt=> opt.MapFrom(src=>src.DateOfBirth.CalcuateAge()));
               
            CreateMap<Photo, PhotoDto>();
        }
    }
}
