namespace rowinpt.api.Core
{
    public class MailMessage
    {
        public string ToAddress { get; set; }
        public string Subject { get; set; }
        public string PlainTextContent { get; set; }
        public string HtmlContent { get; set; }
    }
}
