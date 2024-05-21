using Microsoft.AspNetCore.Mvc;
using SimpleBlog.Bll.Dtos;
using SimpleBlog.Bll.Interfaces;

namespace SimpleBlog.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        /// <summary>
        /// Registration for an user.
        /// </summary>
        /// <returns> </returns>
        /// <response code="200">Registration was succesful.</response>
        /// <response code="400">Bad request.</response>
        [HttpPost("Register")]
        public async Task<ActionResult> Register([FromBody] RegisterDto model)
        {
            await _accountService.RegisterAsync(model);

            return Ok();
        }

        /// <summary>
        /// Login for an user.
        /// </summary>
        /// <returns> </returns>
        /// <response code="200">Login was succesfull.</response>
        /// <response code="401">Unathorized - credentials doesn't match.</response>
        [HttpPost("Login")]
        public async Task<ActionResult> Login([FromBody] LoginDto model)
        {
            string token = await _accountService.LoginAsync(model);

            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized();
            }

            return Ok(token);
        }

        /// <summary>
        /// Logout an user.
        /// </summary>
        /// <returns> </returns>
        /// <response code="200">Logout was succesful.</response>
        [HttpPost("Logout")]
        public async Task<ActionResult> Logout()
        {
            await _accountService.LogoutAsync();
            return Ok();
        }
    }
}
