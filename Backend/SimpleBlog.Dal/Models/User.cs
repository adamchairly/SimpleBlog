using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace SimpleBlog.Dal.Models
{
    public class User : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
