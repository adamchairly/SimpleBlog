using System.ComponentModel.DataAnnotations;

namespace SimpleBlog.Bll.Dtos
{
    public class CreateBlogPostDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
