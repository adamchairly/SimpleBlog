namespace SimpleBlog.Bll.Exceptions
{
    internal class BlogPostException : Exception
    {
        public BlogPostException(string message)
        : base(message)
        {
        }
    }
}
