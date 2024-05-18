using SimpleBlog.Bll.Dtos;
using SimpleBlog.Bll.Result;
using SimpleBlog.Dal.Models;


namespace SimpleBlog.Bll.Interfaces
{
    public interface IBlogPostService
    {
        public Task<IEnumerable<BlogPost>> GetPostsAsync();

        public Task<BlogPost> GetPostAsync(int id);

        public Task<ServiceResult> CreatePostAsync(BlogPostDto postDto, string userId);

        public Task<ServiceResult> EditPostAsync(BlogPostDto post);

        Task<ServiceResult> DeletePostAsync(int id);
    }
}
