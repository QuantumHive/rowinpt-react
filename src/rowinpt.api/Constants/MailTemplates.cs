namespace rowinpt.api.Constants
{
    public static class MailTemplate
    {
        public const string ActivationPlainText =
@"Beste {0},

Er is een Rowin Enckhof Personal Training account voor je aangemaakt.
Klik op de volgende link om je account te activeren en je wachtwoord in te stellen:

{1}


Met vriendelijke groeten,

Team Rowin Enckhof Personal Training";

        public const string ActivationHtml =
@"<p>Beste {0}</p>
<br/><br/>
<p>Er is een <a href='http://rowinpt.com/app'>Rowin Enckhof Personal Training</a> account voor je aangemaakt.</p>
<p>Klik <a href='{1}'>hier</a> om je account te activeren en je wachtwoord in te stellen.</p>
<br/>
<div><h1><a href='{1}'>Activeer je account</a></h1></div>
<br/><br/>
<p>Met vriendelijke groeten,</p>
<p>Team Rowin Enckhof Personal Training</p>";
    }
}
