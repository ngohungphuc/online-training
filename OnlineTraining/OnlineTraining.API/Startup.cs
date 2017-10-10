using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using OnlineTraining.API.Helpers.Extensions;

namespace OnlineTraining.API
{
    public class Startup
    {
        private static readonly string secretKey = "mysupersecret_secretkey!123";
        private static readonly string issure = "ota";
        private static readonly string audience = "otaAudience";
        private static SymmetricSecurityKey signingKey;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            //services.UseJwt(issure, audience, signingKey);
            services.IntegrateSwagger();
            services.AddSignalR();
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDevEnvConfig(env);
            app.ConfigCors();
            //app.UseJwt(issure, audience, signingKey);
            app.ConfigSwagger();
            app.MapSignalR();
            app.UseMvc();
        }
    }
}
