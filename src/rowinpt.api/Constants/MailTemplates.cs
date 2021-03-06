﻿namespace rowinpt.api.Constants
{
    public static class MailTemplate
    {
        public const string ResetPlainText =
            @"Beste {0},

Je hebt een verzoek gedaan om je wachtwoord opnieuw in te stellen voor je Rowin Enckhof Personal Training account.
LET OP! Heb je geen verzoek gedaan om je wachtwoord opnieuw in te stellen? Negeer en verwijder dan onmiddelijk deze mail!

Plak de link hieronder in je webbrowser om je wachtwoord opnieuw in te stellen.

{1}


Met vriendelijke groeten,

Team Rowin Enckhof Personal Training";

        public const string ResetHtml =
            @"<!DOCTYPE html>
<html>
  <head>
    <style>
      a:hover{{color:#888888}}
    </style>
    <style type=""text/css"">
      @import url(""//fonts.googleapis.com/css?family=Lato|Source+Sans+Pro|Open+Sans"");
    </style>
  </head>
  <body style=""font-family:'Source Sans Pro', sans-serif;font-size:1.2rem;color:#666666;"">
    <p style=""margin-bottom:3rem;"">Beste {0},</p>
    <p>Je hebt een verzoek gedaan om je wachtwoord opnieuw in te stellen voor je <a href=""http://rowinpt.com/app"" target=""_blank"" style=""color:#23d05f;"">Rowin Enckhof Personal Training</a> account.</p>
    <p><strong>Let op!</strong> Heb je geen verzoek gedaan om je wachtwoord opnieuw in te stellen? Negeer en verwijder dan onmiddelijk deze mail!</p>    
    <p style=""margin-bottom:3rem;""></p>
    <p>Klik hieronder om je wachtwoord opnieuw in te stellen.</p>
    <p style=""margin-bottom:3rem;""></p>
    <a href=""{1}"" style=""border:2px solid #23d05f;color:#23d05f;padding:0.8rem 1.4rem; text-decoration:none; margin-left:1rem; letter-spacing:2px; font-size:1rem;"">RESET</a>
    <p style=""margin-top:3em;margin-bottom:0.5rem;""><small>Als de knop hierboven niet werkt, plak dan de onderstaande link in je webbrowser om je wachtwoord opnieuw in te stellen.</small></p>
    <pre style=""max-width:40rem;word-wrap:break-word !important;font-size:1rem;margin:0;padding:0;white-space: pre-wrap;"">{1}</pre>
    <p style=""margin-top:3rem;"">Met vriendelijke groeten,</p>
    <p>Team Rowin Enckhof Personal Training</p>
    <p><img src=""https://rowinpt.azurewebsites.net/rowinpt_logo_re_website_36.png"" alt=""logo""/></p>
  </body>
</html>";


        public const string ActivationPlainText =
@"Beste {0},


Er is een Rowin Enckhof Personal Training account voor je aangemaakt.
Plak de link hieronder in je webbrowser om je account te activeren en je nieuwe wachtwoord in te stellen.
LET OP! De activatie code vervalt na 7 dagen vanaf het moment dat deze mail verzonden is.

{1}


Met vriendelijke groeten,

Team Rowin Enckhof Personal Training";

        public const string ActivationHtml =
@"<!DOCTYPE html>
<html>
  <head>
    <style>
      a:hover{{color:#888888}}
    </style>
    <style type=""text/css"">
      @import url(""//fonts.googleapis.com/css?family=Lato|Source+Sans+Pro|Open+Sans"");
    </style>
  </head>
  <body style=""font-family:'Source Sans Pro', sans-serif;font-size:1.2rem;color:#666666;"">
    <p style=""margin-bottom:3rem;"">Beste {0},</p>
    <p>Er is een <a href=""http://rowinpt.com/app"" target=""_blank"" style=""color:#23d05f;"">Rowin Enckhof Personal Training</a> account voor je aangemaakt.</p>
    <p>Klik hieronder om je account te activeren en je nieuwe wachtwoord in te stellen.</p>
    <p><strong>Let op!</strong> De activatie code vervalt na 7 dagen vanaf het moment dat deze mail verzonden is.</p>
    <p style=""margin-bottom:3rem;""></p>
    <a href=""{1}"" style=""border:2px solid #23d05f;color:#23d05f;padding:0.8rem 1.4rem; text-decoration:none; margin-left:1rem; letter-spacing:2px; font-size:1rem;"">ACTIVEER</a>
    <p style=""margin-top:3em;margin-bottom:0.5rem;""><small>Als de knop hierboven niet werkt, plak dan de onderstaande link in je webbrowser om je account te activeren.</small></p>
    <pre style=""max-width:40rem;word-wrap:break-word !important;font-size:1rem;margin:0;padding:0;white-space: pre-wrap;"">{1}</pre>
    <p style=""margin-top:3rem;"">Met vriendelijke groeten,</p>
    <p>Team Rowin Enckhof Personal Training</p>
    <p><img src=""https://rowinpt.azurewebsites.net/rowinpt_logo_re_website_36.png"" alt=""logo""/></p>
  </body>
</html>";
    }
}
