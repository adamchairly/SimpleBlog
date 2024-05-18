using Microsoft.AspNetCore.Mvc;
using SimpleBlog.Bll.Dtos;
using SimpleBlog.Bll.Services;
using SimpleBlog.Dal.Models;
using System.Security.Claims;

namespace SimpleBlog.Bll.Interfaces
{
    public interface IBlogPostService
    {
        public Task<IEnumerable<BlogPost>> GetPostsAsync();

        public Task<BlogPost> GetPostAsync(int id);

        public Task<ServiceResult> CreatePostAsync(BlogPostDto postDto, ClaimsPrincipal user);

        public Task<ServiceResult> EditPostAsync(BlogPostDto post);

        Task<ServiceResult> DeletePostAsync(int id);
    }
}
