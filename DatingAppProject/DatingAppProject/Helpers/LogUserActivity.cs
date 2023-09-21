using DatingAppProject.Extensions;
using DatingAppProject.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DatingAppProject.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            ActionExecutedContext actionExecutedContext = await next();

            if (!actionExecutedContext.HttpContext.User.Identity.IsAuthenticated) return;

           
            int userId = actionExecutedContext.HttpContext.User.GetUserId();
            var repo = actionExecutedContext.HttpContext.RequestServices.GetRequiredService<IUserRepository>();
            var user = await repo.GetUserByIdAsync(userId);
            user.LastActive = DateTime.UtcNow;
            await repo.SaveAllAsync();

        }
    }
}
