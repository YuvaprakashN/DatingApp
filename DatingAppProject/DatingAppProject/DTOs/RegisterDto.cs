using System.ComponentModel.DataAnnotations;

namespace DatingAppProject.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string UserNAme { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
