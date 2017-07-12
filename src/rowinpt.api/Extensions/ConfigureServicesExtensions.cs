using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using rowinpt.api.Models;

namespace rowinpt.api
{
    public static class ConfigureServicesExtensions
    {
        public static void AddIdentityStores<TIdentityUser, TIdentityRole>(this IServiceCollection services)
            where TIdentityUser : IdentityUser<int>
            where TIdentityRole : IdentityRole<int>
        {
            services.AddIdentity<TIdentityUser, TIdentityRole>()
                .AddDefaultTokenProviders();

            services.AddScoped<IUserStore<TIdentityUser>,
                UserStore<TIdentityUser, TIdentityRole, RowinContext, int>>();
            services.AddScoped<IRoleStore<TIdentityRole>,
                RoleStore<TIdentityRole, RowinContext, int>>();
        }
    }
}
