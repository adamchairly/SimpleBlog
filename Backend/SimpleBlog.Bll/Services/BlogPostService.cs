using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SimpleBlog.Bll.Dtos;
using SimpleBlog.Bll.Interfaces;
using SimpleBlog.Bll.Result;
using SimpleBlog.Dal;
using SimpleBlog.Dal.Models;

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

        public async Task<IEnumerable<BlogPostDto>> GetPostsAsync(string userId)
        {
            _logger.LogInformation("Returning all the posts.");

            return await _context.BlogPosts
                .Select(post => new BlogPostDto
                {
                    Id = post.Id,
                    Title = post.Title,
                    Content = post.Content,
                    Author = post.Author,
                    DateCreated = post.DateCreated,
                    IsEditable = post.UserId == userId
                })
                .ToListAsync();
        }

        public async Task<BlogPostDto> GetPostAsync(int id, string userId)
        {
            _logger.LogInformation($"Returning post with id {id}.");

            var post = await _context.BlogPosts.FindAsync(id);

            var dto = new BlogPostDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                Author = post.Author,
                DateCreated = post.DateCreated,
                IsEditable = post.UserId == userId
            };

            return dto;
        }

        public async Task<ServiceResult> CreatePostAsync(CreateBlogPostDto postDto, string userId)
        {
            // Wrong user ID
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

        public async Task<ServiceResult> EditPostAsync(EditBlogPostDto post, string userId)
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

            // The user can't edit this post.
            if (postEntity.UserId != userId)
            {
                return ServiceResult.FailureResult("Unauthorized to edit this post.");
            }

            postEntity.Title = post.Title;
            postEntity.Content = post.Content;
            postEntity.DateCreated = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return ServiceResult.SuccessResult("Post edited succesfully.");
        }

        public async Task<ServiceResult> DeletePostAsync(int id, string userId)
        {
            var post = await _context.BlogPosts.FindAsync(id);

            if (post == null)
            {
                _logger.LogWarning("Post not found: {Id}", id);
                return ServiceResult.FailureResult("Post not found.");
            }


            // The user can't delete this post.
            if (post.UserId != userId)
            {
                return ServiceResult.FailureResult("Unauthorized to delete this post.");
            }

            _context.BlogPosts.Remove(post);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Post deleted with ID {PostId}", post.Id);

            return ServiceResult.SuccessResult("Post deleted.");
        }
    }
}
