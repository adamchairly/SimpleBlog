
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleBlog.Api.Controllers;
using SimpleBlog.Bll.Dtos;
using SimpleBlog.Bll.Interfaces;
using SimpleBlog.Dal;
using SimpleBlog.Dal.Models;
using System.Security.Claims;

namespace SimpleBlog.Bll.Services
{
    public class BlogPostService : IBlogPostService
    {
        private readonly BlogDbContext _context;
        private readonly ILogger<BlogPostService> _logger;

        public BlogPostService(
            BlogDbContext context, 
            ILogger<BlogPostService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<BlogPost>> GetPostsAsync()
        {
            _logger.LogInformation("Returning all the posts.");
            return await _context.BlogPosts.ToListAsync();
        }

        public async Task<BlogPost> GetPostAsync(int id)
        {
            _logger.LogInformation($"Returningpost with id {id}.");

            var post = await _context.BlogPosts.FindAsync(id);

            return post;
        }

        public async Task<ServiceResult> CreatePostAsync(BlogPostDto postDto, ClaimsPrincipal user)
        {
            var identity = user.Identity as ClaimsIdentity;

            // Find the Id of the sender
            var userId = identity.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                _logger.LogInformation("User ID is not found.");
                return ServiceResult.FailureResult("User ID is not found.");
            }

            // Find the user from the db using the ID 
            var userQuery = await _context.Users.SingleOrDefaultAsync(x => x.Id == userId);

            if (userQuery == null)
            {
                _logger.LogInformation("User not found in the database.");
                return ServiceResult.FailureResult("User not found in the database.");
            }

            var post = new BlogPost
            {
                Title = postDto.Title,
                Content = postDto.Content,
                Author = $"{userQuery.FirstName} {userQuery.LastName}",
                DateCreated = DateTime.UtcNow,
                UserId = userId
            };

            _context.BlogPosts.Add(post);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Post created with ID {PostId} by user {Username}", post.Id, $"{userQuery.FirstName} {userQuery.LastName}");

            return ServiceResult.SuccessResult("Post created.", post);
        }

        public async Task<ServiceResult> EditPostAsync(BlogPostDto post)
        {


            if (post.Id == null)
            {
                _logger.LogWarning("Unspecified post Id.");
                return ServiceResult.FailureResult("Unspecified post Id.");
            }


            var postEntity = await _context.BlogPosts.SingleOrDefaultAsync(p => p.Id == post.Id);

            if (postEntity == null)
            {
                return ServiceResult.FailureResult("Post not found.");
            }

            postEntity.Title = post.Title;
            postEntity.Content = post.Content;

            await _context.SaveChangesAsync();

            return ServiceResult.SuccessResult("Post edited succesfully.");
        }

        public async Task<ServiceResult> DeletePostAsync(int id)
        {
            var post = await _context.BlogPosts.FindAsync(id);

            if (post == null)
            {
                _logger.LogWarning("Post not found: {Id}", id);
                return ServiceResult.FailureResult("Post not found.");
            }

            _context.BlogPosts.Remove(post);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Post deleted with ID {PostId}", post.Id);

            return ServiceResult.SuccessResult("Post deleted.");
        }
    }
}
