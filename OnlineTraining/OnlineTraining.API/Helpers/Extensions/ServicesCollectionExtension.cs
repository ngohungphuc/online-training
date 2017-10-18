using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using OnlineTraining.Helper.ElasticSearch;
using Swashbuckle.AspNetCore.Swagger;

namespace OnlineTraining.API.Helpers.Extensions
{
    public static class ServicesCollectionExtension
    {
        public static IConfiguration Configuration { get; }

        public static IServiceCollection IntegrateSwagger(this IServiceCollection services)
        {
            // Register the Swagger generator, defining one or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "Online Training API",
                    Contact = new Contact { Name = "Tony Hudson", Email = "", Url = "github.com/ngohungphuc" }
                });
            });

            return services;
        }

        public static IServiceCollection InjectServicesCollection(this IServiceCollection services)
        {
            //services.AddSingleton<IMongoClient, MongoClient>();
            services.AddScoped<IElasticSearch, ElasticSearch>();
            return services;
        }

        public static void ConfigureJwtAuthService(this IServiceCollection services)
        {
            var audienceConfig = Configuration.GetSection("Audience");
            var symetricKeyAsBase64 = audienceConfig["Secret"];
            var keyByteArray = Encoding.ASCII.GetBytes(symetricKeyAsBase64);
            var signingKey = new SymmetricSecurityKey(keyByteArray);

            var tokenValidationParameters = new TokenValidationParameters
            {
                // The signing key must match!
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,

                // Validate the JWT Issuer (iss) claim
                ValidateIssuer = true,
                ValidIssuer = audienceConfig["Iss"],

                // Validate the JWT Audience (aud) claim
                ValidateAudience = true,
                ValidAudience = audienceConfig["Aud"],

                // Validate the token expiry
                ValidateLifetime = true,

                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(o =>
            {
                o.TokenValidationParameters = tokenValidationParameters;
            });
        }
    }
}
