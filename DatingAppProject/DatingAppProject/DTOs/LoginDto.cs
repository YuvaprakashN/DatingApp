using System.ComponentModel.DataAnnotations;

namespace DatingAppProject.DTOs
{
    public class LoginDto
    {
        [Required]
        public string UserNAme { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
