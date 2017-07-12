using System.Threading.Tasks;
using rowinpt.api.Core;

namespace rowinpt.api
{
    public interface IEmailService
    {
        Task SendAsync(MailMessage message);
    }
}
