using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using rowinpt.api.Models;
using rowinpt.api.Options;
using rowinpt.api.Services;

namespace rowinpt.api
{
    public class Startup
    {
        private readonly IConfigurationRoot configuration;

        public Startup(IHostingEnvironment hostingEnvironment)
        {
            var builder = new ConfigurationBuilder();
            builder.SetBasePath(hostingEnvironment.ContentRootPath);

            builder.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            if (hostingEnvironment.IsProduction())
            {
                builder.AddJsonFile($"appsettings.{hostingEnvironment.EnvironmentName}.json", optional: false);
            }

            builder.AddEnvironmentVariables();

            configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var environment = services.BuildServiceProvider().GetService<IHostingEnvironment>();
            if (environment.IsProduction())
            {
                services.Configure<MvcOptions>(options =>
                {
                    options.Filters.Add(new RequireHttpsAttribute());
                });
            }

            services.Configure<MailOptions>(configuration.GetSection("MailSettings"));
            
            if (environment.IsProduction())
            {
                services.Configure<MailOptions>(options =>
                {
                    options.ApiKey = configuration["SENDGRID_API_KEY"];
                });
            }

            if (environment.IsProduction())
            {
                services.AddSingleton<IEmailService, MailService>();
            }
            else
            {
                services.AddSingleton<IEmailService, ApplicationInsightsMailService>();
            }

            services.AddCors();
            services.AddMvc();

            services.AddIdentityStores<User, IdentityRole<int>>();

            services.AddDbContext<RowinContext>(options => options.UseSqlServer(configuration.GetConnectionString("RowinPT")));

            services.ConfigureApplicationCookie(options =>
            {
                options.ExpireTimeSpan = TimeSpan.FromDays(150);
                options.Cookie.Name = ".AspNetCore.Cookies.RowinPT";
            });

            services.Configure<DataProtectionTokenProviderOptions>(options =>
            {
                options.TokenLifespan = TimeSpan.FromDays(7);
            });

            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 5;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;

                // Lockout settings
                options.Lockout.AllowedForNewUsers = false;

                // User settings
                options.User.RequireUniqueEmail = true;
                options.SignIn.RequireConfirmedEmail = true;
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment environment)
        {
            if (environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    ConfigFile = "webpack.config.dev.js",
                });
            }

            if (environment.IsProduction())
            {
                var rewriteOptions = new RewriteOptions().AddRedirectToHttpsPermanent();
                app.UseRewriter(rewriteOptions);
            }

            //var serviceScopeFactory = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>();
            //using (var serviceScope = serviceScopeFactory.CreateScope())
            //{
            //    var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<IdentityRole<int>>>();
            //    roleManager.SeedRoles().Wait();
            //}
            //using (var serviceScope = serviceScopeFactory.CreateScope())
            //{
            //    var userManager = serviceScope.ServiceProvider.GetService<UserManager<User>>();
            //    userManager.SeedUsers().Wait();
            //}
            //using (var serviceScope = serviceScopeFactory.CreateScope())
            //{
            //    var rowinContext = serviceScope.ServiceProvider.GetService<RowinContext>();
            //    rowinContext.Database.Migrate();
            //    rowinContext.EnsureSeed().Wait();
            //}

            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}