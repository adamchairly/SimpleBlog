using SimpleBlog.Bll.Dtos;
using SimpleBlog.Bll.Result;

namespace SimpleBlog.Bll.Interfaces
{
    public interface IAccountService
    {
        Task<ServiceResult> RegisterAsync(RegisterDto model);
        Task<ServiceResult> LoginAsync(LoginDto model);
        Task<ServiceResult> LogoutAsync();
    }
}
