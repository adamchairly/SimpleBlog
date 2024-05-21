using SimpleBlog.Bll.Dtos;

namespace SimpleBlog.Bll.Interfaces
{
    public interface IBlogPostService
    {
        public Task<IEnumerable<BlogPostDto>> GetPostsAsync(string userId);

        public Task<BlogPostDto> GetPostAsync(int id, string userId);

        public Task CreatePostAsync(CreateBlogPostDto postDto, string userId);

        public Task EditPostAsync(EditBlogPostDto post, string userId);

        public Task DeletePostAsync(int id, string userId);
    }
}
