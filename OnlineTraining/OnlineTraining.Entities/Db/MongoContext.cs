using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using OnlineTraining.Helper.Config;

namespace OnlineTraining.Entities.Db
{
    public interface IMongoConnect
    {
        IMongoDatabase GetConnection();
    }

    public class MongoContext
    {
        private readonly IOptions<OtaConfig> config;

        public MongoContext(IOptions<OtaConfig> Config)
        {
            config = Config;
        }

        public IMongoDatabase GetConnection()
        {
            var client = new MongoClient(config.Value.ConnectionString);
            var database = client.GetDatabase(config.Value.Database);
            return database;
        }
    }
}