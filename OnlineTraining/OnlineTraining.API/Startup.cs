using System;
using System.IO;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using OnlineTraining.API.Helpers.Extensions;
using OnlineTraining.Entities.Db;


namespace OnlineTraining.API
{
    public class Startup
    {

        public Startup(
            IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper();
            services.ConfigureJwtAuthService(Configuration);
            services.AddCors();
            services.IntegrateSwagger();
            services.InjectServicesCollection();
            services.AddSignalR();
            services.UseCompressionCollection();
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseResponseCompression();
            app.UseDevEnvConfig(env);
            app.UseAuthentication();
            app.ConfigCors();
            app.ConfigSwagger();
            app.MapSignalR();
            app.UseMvc();
        }
    }
}