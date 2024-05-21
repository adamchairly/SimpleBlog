using SimpleBlog.Dal.Models;
using System.Security.Claims;

namespace SimpleBlog.Api.Controllers.Helpers
{
    public static class ClaimsExtension
    {
        public static string GetUserId(ClaimsPrincipal user)
        {
            var identity = user.Identity as ClaimsIdentity;
            var userId = identity.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return userId;
        }
    }
}
