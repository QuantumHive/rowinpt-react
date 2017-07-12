using System;
using System.IO;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.AspNetCore.Hosting;

namespace rowinpt.api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var telemetryClient = new TelemetryClient();
            telemetryClient.TrackTrace("Booting Application RowinPT.Api . . .", SeverityLevel.Verbose);
            try
            {
                var host = new WebHostBuilder()
                    .UseApplicationInsights()
                    .UseKestrel()
                    .UseContentRoot(Directory.GetCurrentDirectory())
                    .UseStartup<Startup>()
                    .UseIISIntegration()
                    .Build();

                telemetryClient.TrackTrace("Listening . . .", SeverityLevel.Verbose);
                host.Run();
            }
            catch (Exception exception)
            {
                telemetryClient.TrackTrace("Something terrible has happened! Exception has been logged.", SeverityLevel.Critical);
                telemetryClient.TrackException(exception);
            }
        }
    }
}
