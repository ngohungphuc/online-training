using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using OnlineTraining.API.Hubs;

namespace OnlineTraining.API.Helpers.Extensions
{
    public static class ApplicationBuilderExtension
    {
        public static IApplicationBuilder UseDevEnvConfig(this IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            return app;
        }

        public static IApplicationBuilder ConfigCors(this IApplicationBuilder app)
        {
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            return app;
        }

        public static IApplicationBuilder MapSignalR(this IApplicationBuilder app)
        {
            app.UseSignalR(routes => { routes.MapHub<OnlineHub>("onlinehub"); });

            return app;
        }

        public static IApplicationBuilder ConfigSwagger(this IApplicationBuilder app)
        {
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c => { c.SwaggerEndpoint($"/swagger/v1/swagger.json", "My API V1"); });

            return app;
        }
    }
}