using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using rowinpt.api.Models;
using rowinpt.api.ViewModels;

namespace rowinpt.api
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;
        private readonly IHttpContextAccessor contextAccessor;

        public AccountController(
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            IHttpContextAccessor contextAccessor)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.contextAccessor = contextAccessor;
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Signin([FromBody]AccountViewModel accountViewModel)
        {
            var result = await signInManager.PasswordSignInAsync(accountViewModel.Email, accountViewModel.Password, isPersistent: true, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                var user = await userManager.FindByNameAsync(accountViewModel.Email);
                var role = await userManager.GetRolesAsync(user);
                return Json(new {Role = role.Single()});
            }

            return Unauthorized();
        }

        [Authorize]
        [HttpPost("signout")]
        public async Task<IActionResult> SignOut()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshSignIn()
        {
            var principal = contextAccessor.HttpContext.User;
            if (signInManager.IsSignedIn(principal))
            {
                var user = await userManager.FindByNameAsync(principal.Identity.Name);
                var role = await userManager.GetRolesAsync(user);

                await signInManager.RefreshSignInAsync(user);

                return Json(new {Role = role.Single()});
            }
            return Unauthorized();
        }

        [HttpPost("confirm")]
        public async Task<IActionResult> Confirm([FromBody]ActivationViewModel activationViewModel)
        {
            var user = await userManager.FindByIdAsync(activationViewModel.Id);

            if (ValidateUserforConfirmation(user))
            {
                var result = await userManager.ConfirmEmailAsync(user, WebUtility.UrlDecode(activationViewModel.Code));
                if (result == IdentityResult.Success)
                {
                    await userManager.AddPasswordAsync(user, activationViewModel.Password);
                    return Ok();
                }
            }

            return BadRequest();
        }

        private bool ValidateUserforConfirmation(User user)
        {
            if (user == null) return false;
            if (user.EmailConfirmed) return false;

            var principal = contextAccessor.HttpContext.User;
            if (signInManager.IsSignedIn(principal) && principal.Identity.Name != user.UserName) return false;

            return true;
        }
    }
}
