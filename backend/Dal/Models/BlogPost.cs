using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public string UserId { get; set; }

    }
}
