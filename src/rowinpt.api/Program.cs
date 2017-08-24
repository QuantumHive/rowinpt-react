using System;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace rowinpt.api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var telemetryClient = new TelemetryClient();
            telemetryClient.TrackTrace("Booting RowinPT.Api . . .", SeverityLevel.Verbose);
            try
            {
                BuildWebHost(args).Run();
            }
            catch (Exception exception)
            {
                telemetryClient.TrackTrace("Something terrible has happened! Exception has been logged.", SeverityLevel.Critical);
                telemetryClient.TrackException(exception);
            }
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
