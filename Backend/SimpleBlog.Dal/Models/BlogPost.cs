using System.ComponentModel.DataAnnotations;

namespace SimpleBlog.Dal.Models
{
    public class BlogPost
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public string Author { get; set; }

        public DateTime DateCreated { get; set; } = DateTime.UtcNow;

        // The creator of the post
        public string UserId { get; set; }

    }
}
