using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace OnlineTraining.API.Helpers.Extensions
{
    public static class ServicesCollectionExtension
    {
        public static IServiceCollection AddConfig(this IServiceCollection services)
        {
            return services;
        }
    }
}
