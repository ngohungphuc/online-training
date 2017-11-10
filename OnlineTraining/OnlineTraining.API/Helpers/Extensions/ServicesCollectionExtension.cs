using System;
using System.IO.Compression;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using OnlineTraining.Helper.ElasticSearch;
using OnlineTraining.Repositories.Interfaces;
using OnlineTraining.Repositories.Repositories;
using OnlineTraining.Services.Interfaces;
using OnlineTraining.Services.Services;
using Swashbuckle.AspNetCore.Swagger;

namespace OnlineTraining.API.Helpers.Extensions
{
    public static class ServicesCollectionExtension
    {
        public static IServiceCollection IntegrateSwagger(this IServiceCollection services)
        {
            // Register the Swagger generator, defining one or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "Online Training API",
                    Contact = new Contact {Name = "Tony Hudson", Email = "", Url = "github.com/ngohungphuc"}
                });
            });

            return services;
        }

        public static IServiceCollection UseCompressionCollection(this IServiceCollection services)
        {
            services.Configure<GzipCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Optimal;
            });
            services.AddResponseCompression(options =>
            {
                options.Providers.Add<GzipCompressionProvider>();
                options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[]  {
                    // Plain Text
                    "text/html",
                    "text/plain",
                    "text/css",
                    "text/mathml",
                    "application/rtf",
                    // JSON
                    "application/javascript",
                    "application/json",
                    "application/json; charset=utf-8",
                    "application/manifest+json",
                    "application/x-web-app-manifest+json",
                    "text/cache-manifest",
                    // XML
                    "application/atom+xml",
                    "application/rss+xml",
                    "application/xslt+xml",
                    "application/xml",
                    // Fonts
                    "font/opentype",
                    "font/otf",
                    "font/truetype",
                    "application/font-woff",
                    "application/vnd.ms-fontobject",
                    "application/x-font-ttf",
                    // Images
                    "image/svg+xml",
                    "image/x-icon"
                });
            });
            return services;
        }

        public static IServiceCollection InjectServicesCollection(this IServiceCollection services)
        {
            services.AddScoped<IElasticSearch, ElasticSearch>();

            services.AddSingleton<IUserRepository, UserRepository>();
            services.AddScoped<IUserServices, UserServices>();

            services.AddSingleton<ILearningPathRepository, LearningPathRepository>();
            services.AddScoped<ILearningPathServices, LearningPathServices>();

            services.AddSingleton<ICourseRepository, CourseRepository>();
            services.AddScoped<ICourseServices, CourseServices>();

            services.AddSingleton<IRTokenRepository, RTokenRepository>();
            return services;
        }

        public static void ConfigureJwtAuthService(this IServiceCollection services, IConfiguration configuration)
        {
            var audienceConfig = configuration.GetSection("Audience");
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
                .AddJwtBearer(o => { o.TokenValidationParameters = tokenValidationParameters; });
        }
    }
}