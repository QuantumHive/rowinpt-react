using System.Collections.Generic;
using System.Linq;
using System.Net;
using rowinpt.api.Core;
using System.Threading.Tasks;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using rowinpt.api.Constants;
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
        private readonly IEmailService emailService;
        private readonly TelemetryClient telemetryClient;

        public AccountController(
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            IHttpContextAccessor contextAccessor, IEmailService emailService)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.contextAccessor = contextAccessor;
            this.emailService = emailService;
            telemetryClient = new TelemetryClient();
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

        [HttpPut("password/change")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody]PasswordChangeViewModel passwordChange)
        {
            var principal = contextAccessor.HttpContext.User;
            var user = await userManager.FindByNameAsync(principal.Identity.Name);
            var result = await userManager.ChangePasswordAsync(user, passwordChange.CurrentPassword, passwordChange.Password);

            if (result.Succeeded)
            {
                await signInManager.SignOutAsync();
                return Ok();
            }

            return Unauthorized();
        }

        [HttpPost("confirm")]
        public async Task<IActionResult> Confirm([FromBody]ActivationViewModel activationViewModel)
        {
            var user = await userManager.FindByIdAsync(activationViewModel.Id);

            if (ValidateUserforConfirmation(user))
            {
                var result = await userManager.ConfirmEmailAsync(user, activationViewModel.Code);
                if (result == IdentityResult.Success)
                {
                    await userManager.AddPasswordAsync(user, activationViewModel.Password);
                    return Ok();
                }
                telemetryClient.TrackTrace($"User {user.Email} could not confirm, Identity result: '{result}'. Activation code: '{activationViewModel.Code}'", SeverityLevel.Warning);
            }

            return BadRequest();
        }

        [HttpPost("reset")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordViewModel viewModel)
        {
            var user = await userManager.FindByIdAsync(viewModel.Id);

            if (ValidateUserForResetPassword(user))
            {
                var result = await userManager.ResetPasswordAsync(user, viewModel.Code, viewModel.Password);
                if (result == IdentityResult.Success)
                {
                    return Ok();
                }
                telemetryClient.TrackTrace($"User {user.Email} could not reset password, Identity result: '{result}'. Reset password token: '{viewModel.Code}'", SeverityLevel.Warning);
            }

            return BadRequest();
        }

        [HttpPut("reset/{email}")]
        public async Task<IActionResult> ResetPassword(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var code = await userManager.GeneratePasswordResetTokenAsync(user);
                var encode = WebUtility.UrlEncode(code);
                var url = $@"https://rowinpt.azurewebsites.net/reset?id={user.Id}&code={encode}";

                telemetryClient.TrackEvent("ResetPasswordMail", new Dictionary<string, string>
                {
                    {"email", email},
                    {"code", code },
                    {"url", url },
                    {"urlEncode", encode }
                });

                var message = new MailMessage
                {
                    ToAddress = email,
                    Subject = "Wachtwoord reset verzoek",
                    PlainTextContent = string.Format(MailTemplate.ResetPlainText, user.FirstName, url),
                    HtmlContent = string.Format(MailTemplate.ResetHtml, user.FirstName, url)
                };

                await emailService.SendAsync(message);
            }

            return Ok();
        }

        private bool ValidateUserForResetPassword(User user)
        {
            if (user == null)
            {
                telemetryClient.TrackTrace("User does not exists", SeverityLevel.Warning);
                return false;
            }

            if (!user.EmailConfirmed)
            {
                telemetryClient.TrackTrace($"{user.Email} not confirmed yet confirmed", SeverityLevel.Warning);
                return false;
            }

            var principal = contextAccessor.HttpContext.User;
            if (signInManager.IsSignedIn(principal) && principal.Identity.Name != user.UserName)
            {
                telemetryClient.TrackTrace($"{principal.Identity.Name} already signed in. Attempts to reset {user.UserName}", SeverityLevel.Warning);
                return false;
            }

            return true;
        }

        private bool ValidateUserforConfirmation(User user)
        {
            if (user == null)
            {
                telemetryClient.TrackTrace("User does not exists", SeverityLevel.Warning);
                return false;
            }
            if (user.EmailConfirmed)
            {
                telemetryClient.TrackTrace($"{user.Email} already confirmed", SeverityLevel.Warning);
                return false;
            }

            var principal = contextAccessor.HttpContext.User;
            if (signInManager.IsSignedIn(principal) && principal.Identity.Name != user.UserName)
            {
                telemetryClient.TrackTrace($"{principal.Identity.Name} already signed in. Attempts to confirm {user.UserName}", SeverityLevel.Warning);
                return false;
            }

            return true;
        }
    }
}
