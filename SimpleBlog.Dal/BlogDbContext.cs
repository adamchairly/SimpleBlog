using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SimpleBlog.Dal.Models;

namespace SimpleBlog.Dal
{
    public class BlogDbContext : IdentityDbContext<User>
    {
        public BlogDbContext(DbContextOptions<BlogDbContext> options)
            : base(options)
        {
        }

        public DbSet<BlogPost> BlogPosts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Customizing default table names by ASP.NET Identity

            builder.Entity<User>(entity => {
                entity.ToTable(name: "Users");
            });
            builder.Entity<IdentityRole>(entity => {
                entity.ToTable(name: "Roles");
            });
            builder.Entity<IdentityUserRole<string>>(entity => {
                entity.ToTable(name: "UserRoles");
            });
            builder.Entity<IdentityUserClaim<string>>(entity => {
                entity.ToTable(name: "UserClaims");
            });
            builder.Entity<IdentityUserLogin<string>>(entity => {
                entity.ToTable(name: "UserLogins");
            });
            builder.Entity<IdentityRoleClaim<string>>(entity => {
                entity.ToTable(name: "RoleClaims");
            });
            builder.Entity<IdentityUserToken<string>>(entity => {
                entity.ToTable(name: "UserTokens");
            });

            builder.Entity<BlogPost>(entity => {
                entity.ToTable(name: "BlogPosts");
            });

            // Seeding initial data
            var hasher = new PasswordHasher<User>();
            var user = new User
            {
                Id = "1",
                UserName = "admin",
                NormalizedUserName = "ADMIN",
                Email = "admin@simpleblog.com",
                NormalizedEmail = "ADMIN@SIMPLEBLOG.COM",
                EmailConfirmed = true,
                FirstName = "Admin",
                LastName = "User",
            };
            user.PasswordHash = hasher.HashPassword(user, "Admin@123");

            builder.Entity<User>().HasData(user);
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole { Id = "1", Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Id = "2", Name = "User", NormalizedName = "USER" }
            );
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "1", UserId = "1" });
        }
    }
}
