using System.IO;
using Microsoft.Extensions.Configuration;

namespace OnlineTraining.Helper.Config
{
    public static class ConfigReader
    {
        public static IConfigurationRoot GetConfigFile()
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json").Build();
            return config;
        }
    }
}