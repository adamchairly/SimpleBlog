using SimpleBlog.Bll.Dtos;
using SimpleBlog.Bll.Result;
using SimpleBlog.Dal.Models;


namespace SimpleBlog.Bll.Interfaces
{
    public interface IBlogPostService
    {
        public Task<IEnumerable<BlogPostDto>> GetPostsAsync(string userId);

        public Task<BlogPost> GetPostAsync(int id, string userId);

        public Task<ServiceResult> CreatePostAsync(CreateBlogPostDto postDto, string userId);

        public Task<ServiceResult> EditPostAsync(BlogPostDto post, string userId);

        Task<ServiceResult> DeletePostAsync(int id, string userId);
    }
}
