using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OnlineTraining.API.Helpers.Extensions;
using Microsoft.AspNetCore.Identity;
namespace OnlineTraining.API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper();
            services.ConfigureJwtAuthService(Configuration);
            services.AddCors();
            services.IntegrateSwagger();
            services.InjectServicesCollection();
            services.AddSignalR();
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDevEnvConfig(env);
            app.UseAuthentication();
            app.ConfigCors();
            app.ConfigSwagger();
            app.MapSignalR();
            app.UseMvc();
        }
    }
}
