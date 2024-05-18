using System.ComponentModel.DataAnnotations;

namespace SimpleBlog.Bll.Dtos
{
    public class BlogPostDto
    {
        public int? Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
