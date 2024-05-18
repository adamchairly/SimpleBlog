using Microsoft.AspNetCore.Mvc;
using SimpleBlog.Bll.Dtos;
using SimpleBlog.Bll.Interfaces;
using System.Threading.Tasks;

namespace SimpleBlog.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(
            IAccountService accountService
            )
        {
            _accountService = accountService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            var result = await _accountService.RegisterAsync(model);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(result.Message);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var result = await _accountService.LoginAsync(model);

            if (!result.Success)
            {
                return Unauthorized(result.Message);
            }

            return Ok(new { token = result.Data });
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            var result = await _accountService.LogoutAsync();
            return Ok(result.Message);
        }
    }
}
