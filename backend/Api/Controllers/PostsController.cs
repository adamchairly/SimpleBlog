using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SimpleBlog.Dal;
using SimpleBlog.Dal.Models;
using SimpleBlog.Bll.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimpleBlog.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly BlogDbContext _context;
        private readonly ILogger<PostsController> _logger;

        public PostsController(BlogDbContext context, ILogger<PostsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogPost>>> GetPosts()
        {
            _logger.LogInformation("returning all the posts.");
            return await _context.BlogPosts.ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogPost>> GetPost(int id)
        {
            var post = await _context.BlogPosts.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BlogPost>> PostPost(BlogPostDto postDto)
        {
            var username = User.Identity?.Name;
            _logger.LogInformation(username);

            if (string.IsNullOrEmpty(username))
            {
                _logger.LogInformation("username is not correct");
                return Unauthorized();
            }

            var post = new BlogPost
            {
                Title = postDto.Title,
                Content = postDto.Content,
                Author = username,
                DateCreated = DateTime.UtcNow
            };

            _context.BlogPosts.Add(post);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Post created with ID {PostId} by user {Username}", post.Id, username);

            return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(int id, BlogPost post)
        {
            if (id != post.Id)
            {
                _logger.LogWarning("Post ID mismatch: {Id} != {PostId}", id, post.Id);
                return BadRequest();
            }

            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    _logger.LogWarning("Post not found: {Id}", id);
                    return NotFound();
                }
                else
                {
                    _logger.LogError("Concurrency error when updating post {Id}", id);
                    throw;
                }
            }

            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.BlogPosts.FindAsync(id);

            if (post == null)
            {
                _logger.LogWarning("Post not found: {Id}", id);
                return NotFound();
            }

            _context.BlogPosts.Remove(post);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Post deleted with ID {PostId}", post.Id);

            return NoContent();
        }

        private bool PostExists(int id)
        {
            return _context.BlogPosts.Any(e => e.Id == id);
        }
    }
}
