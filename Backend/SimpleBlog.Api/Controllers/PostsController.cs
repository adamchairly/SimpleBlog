using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleBlog.Dal.Models;
using SimpleBlog.Bll.Dtos;
using System.Security.Claims;
using SimpleBlog.Bll.Interfaces;
using Microsoft.IdentityModel.Tokens;
using SimpleBlog.Api.Controllers.Helpers;

namespace SimpleBlog.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        // Controller should not contain ANY logic related data

        private readonly IBlogPostService _blogPostService;
        public PostsController (IBlogPostService blogPostService)
        {
            _blogPostService = blogPostService;
        }

        /// <summary>
        /// Returns all the posts from the server.
        /// </summary>
        /// <returns>All the posts from the server.</returns>
        /// <response code="200">Posts succesfully returned.</response>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogPostDto>>> GetPosts()
        {
            string userId = ClaimsHelper.GetUserId(User);

            return Ok(await _blogPostService.GetPostsAsync(userId));

        }

        /// <summary>
        /// Returns a specific post from the server.
        /// </summary>
        /// <returns> A specific post from the server.</returns>
        /// <response code="200">Posts succesfully returned.</response>
        /// <response code="404">Post not found with the ID.</response>
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogPostDto>> GetPost(int id)
        {
            string userId = ClaimsHelper.GetUserId(User);

            var post = await _blogPostService.GetPostAsync(id, userId);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        /// <summary>
        /// Creates a post. User must be authorized.
        /// </summary>
        /// <returns> </returns>
        /// <response code="200">Posts succesfully created.</response>
        /// <response code="400">User id not found.</response>
        /// <response code="401">User is not authorized.</response>
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BlogPost>> CreatePost(CreateBlogPostDto postDto)
        {
            string userId = ClaimsHelper.GetUserId(User);

            if (string.IsNullOrEmpty(userId))
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

        /// <summary>
        /// Edits a specific post. User must be authorized, and must 
        /// be the creator of the post.
        /// </summary>
        /// <returns> </returns>
        /// <response code="200">Posts succesfully edited.</response>
        /// <response code="400">User id not valid.</response>
        [Authorize]
        [HttpPut]
        public async Task<ActionResult> EditPost(EditBlogPostDto postDto)
        {
            string userId = ClaimsHelper.GetUserId(User);

            if (userId.IsNullOrEmpty())
            {
                return BadRequest();
            }

            var result = await _blogPostService.EditPostAsync(postDto, userId);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(result.Message);
        }

        /// <summary>
        /// Deletes a specific post. User must be authorized.
        /// </summary>
        /// <returns> </returns>
        /// <response code="200">Posts succesfully edited.</response>
        /// <response code="400">User id not valid.</response>
        /// /// <response code="404">Post is not found with the ID.</response>
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePost(int id)
        {
            // Authorization handling
            var identity = User.Identity as ClaimsIdentity;
            var userId = identity.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId.IsNullOrEmpty())
            {
                return BadRequest();
            }

            var result = await _blogPostService.DeletePostAsync(id, userId);

            if (!result.Success)
            {
                return NotFound(result.Message);
            }

            return NoContent();
        }

    }
}




