using DatingAppProject.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace DatingAppProject.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
    
    }
}
