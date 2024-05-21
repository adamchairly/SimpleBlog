using SimpleBlog.Bll.Dtos;

namespace SimpleBlog.Bll.Interfaces
{
    public interface IAccountService
    {
        Task RegisterAsync(RegisterDto model);
        Task<string> LoginAsync(LoginDto model);
        Task LogoutAsync();
    }
}
