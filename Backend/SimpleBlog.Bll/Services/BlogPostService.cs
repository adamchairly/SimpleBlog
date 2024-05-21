using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SimpleBlog.Bll.Dtos;
using SimpleBlog.Bll.Exceptions;
using SimpleBlog.Bll.Interfaces;
using SimpleBlog.Dal;
using SimpleBlog.Dal.Models;

namespace SimpleBlog.Bll.Services
{
    public class BlogPostService : IBlogPostService
    {
        private readonly BlogDbContext _context;

        public BlogPostService(BlogDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BlogPostDto>> GetPostsAsync(string userId)
        {

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

            return await _context.BlogPosts
                .Select(post => new BlogPostDto
                {
                    Id = post.Id,
                    Title = post.Title,
                    Content = post.Content,
                    Author = post.Author,
                    DateCreated = post.DateCreated,
                    IsEditable = post.UserId == userId
                }).SingleAsync(x => x.Id == id);
               
        }

        public async Task CreatePostAsync(CreateBlogPostDto postDto, string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new BlogPostException("User ID is null or empty.");
            }

            // Find the user from the db using the ID 
            var userQuery = await _context.Users.SingleOrDefaultAsync(x => x.Id == userId);

            if (userQuery == null)
            {
                throw new BlogPostException("User not found in the database with the given Id.");
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
        }

        public async Task EditPostAsync(EditBlogPostDto post, string userId)
        {

            var postEntity = await _context.BlogPosts.SingleOrDefaultAsync(p => p.Id == post.Id);

            if (postEntity == null)
            {
                throw new BlogPostException("Post not found with the given ID.");
            }

            // The user can't edit this post.
            if (postEntity.UserId != userId)
            {
                throw new BlogPostException("User can't edit the post with the given ID.");
            }

            postEntity.Title = post.Title;
            postEntity.Content = post.Content;
            postEntity.DateCreated = DateTime.UtcNow;

            await _context.SaveChangesAsync();
        }

        public async Task DeletePostAsync(int id, string userId)
        {
            var post = await _context.BlogPosts.FindAsync(id);

            if (post == null)
            {
                throw new BlogPostException("Post not found with the given ID.");
            }

            // The user can't delete this post.
            if (post.UserId != userId)
            {
                throw new BlogPostException("User can't delete the post with the given ID.");
            }

            _context.BlogPosts.Remove(post);
            await _context.SaveChangesAsync();

        }
    }
}
