using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SimpleBlog.Dal;
using SimpleBlog.Dal.Models;
using SimpleBlog.Bll.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Claims;
using SimpleBlog.Bll.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace SimpleBlog.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        // Controller should not contain ANY data related logic

        private readonly IBlogPostService _blogPostService;
        public PostsController
            (
            IBlogPostService blogPostService
            )
        {
            _blogPostService = blogPostService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogPost>>> GetPosts()
        {
            return Ok(await _blogPostService.GetPostsAsync());

        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogPost>> GetPost(int id)
        {
            var post = await _blogPostService.GetPostAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BlogPost>> CreatePost(BlogPostDto postDto)
        { 
            var identity = User.Identity as ClaimsIdentity;

            // Find the Id of the sender
            var userId = identity.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId.IsNullOrEmpty())
            {
                return BadRequest();
            }

            var result = await _blogPostService.CreatePostAsync(postDto, userId);

            if (!result.Success)
            {
                return Unauthorized(result.Message);
            }

            return Ok();

        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> EditPost(BlogPostDto postDto)
        {

            var result = await _blogPostService.EditPostAsync(postDto);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(result.Message);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var result = await _blogPostService.DeletePostAsync(id);

            if (!result.Success)
            {
                return NotFound(result.Message);
            }

            return NoContent();
        }

    }
}




