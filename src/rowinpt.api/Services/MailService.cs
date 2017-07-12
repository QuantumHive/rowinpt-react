using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.ApplicationInsights;
using Microsoft.Extensions.Options;
using rowinpt.api.Core;
using rowinpt.api.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace rowinpt.api.Services
{
    public class MailService : IEmailService
    {
        private readonly MailOptions mailOptions;
        public MailService(IOptions<MailOptions> subOptionsAccessor)
        {
            mailOptions = subOptionsAccessor.Value;
        }

        public async Task SendAsync(MailMessage message)
        {
            var client = new SendGridClient(mailOptions.ApiKey);

            var from = new EmailAddress(mailOptions.FromAddress);
            var to = new EmailAddress(message.ToAddress);

            var email = MailHelper.CreateSingleEmail(from, to, message.Subject, message.PlainTextContent, message.HtmlContent);

            await client.SendEmailAsync(email);
        }
    }

    public class ApplicationInsightsMailService : IEmailService
    {
        public async Task SendAsync(MailMessage message)
        {
            var client = new TelemetryClient();

            client.TrackEvent("IEmailService.SendAsync()",
                new Dictionary<string, string>
                {
                    {nameof(MailMessage.ToAddress), message.ToAddress },
                    {nameof(MailMessage.Subject), message.Subject },
                    {nameof(MailMessage.PlainTextContent), message.PlainTextContent },
                    {nameof(MailMessage.HtmlContent), message.HtmlContent },
                });
        }
    }
}
