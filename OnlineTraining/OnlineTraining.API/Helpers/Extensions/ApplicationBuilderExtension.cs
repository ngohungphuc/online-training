using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OnlineTraining.API.Hubs;
using OnlineTraining.API.Middleware;

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
            app.UseSignalR(routes =>
            {
                routes.MapHub<OnlineHub>("onlinehub");
            });

            return app;
        }

        public static IApplicationBuilder ConfigSwagger(this IApplicationBuilder app)
        {
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            return app;
        }

        public static IApplicationBuilder UseJwt(this IApplicationBuilder app, string issure,string audience, SymmetricSecurityKey signingKey)
        {
            var jwtOptions = new TokenProviderOptions
            {
                Audience = audience,
                Issuer = issure,
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
            };
            app.UseJwtTokenProviderMiddleware(Options.Create(jwtOptions));

            return app;
        }
    }
}
