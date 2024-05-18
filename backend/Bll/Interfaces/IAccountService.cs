using Microsoft.AspNetCore.Mvc;
using SimpleBlog.Bll.Dtos;
using SimpleBlog.Bll.Services;

namespace SimpleBlog.Bll.Interfaces
{
    public interface IAccountService
    {
        Task<ServiceResult> RegisterAsync(RegisterDto model);
        Task<ServiceResult> LoginAsync(LoginDto model);
        Task<ServiceResult> LogoutAsync();
    }
}
