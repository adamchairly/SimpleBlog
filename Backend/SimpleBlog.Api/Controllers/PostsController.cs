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

            await _blogPostService.CreatePostAsync(postDto, userId);


            return Ok();
        }

        /// <summary>
        /// Edits a specific post. User must be authorized, and must 
        /// be the creator of the post.
        /// </summary>
        /// <returns> </returns>
        /// <response code="200">Posts succesfully edited.</response>
        [Authorize]
        [HttpPut]
        public async Task<ActionResult> EditPost(EditBlogPostDto postDto)
        {
            string userId = ClaimsHelper.GetUserId(User);

            await _blogPostService.EditPostAsync(postDto, userId);


            return Ok();
        }

        /// <summary>
        /// Deletes a specific post. User must be authorized.
        /// </summary>
        /// <returns> </returns>
        /// <response code="204">Posts succesfully deleted.</response>
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePost(int id)
        {
            string userId = ClaimsHelper.GetUserId(User);


            await _blogPostService.DeletePostAsync(id, userId);

            return NoContent();
        }

    }
}




