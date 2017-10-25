using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using OnlineTraining.Helper.Config;

namespace OnlineTraining.Entities.Db
{
    public interface IMongoConnect
    {
        IMongoDatabase GetConnection();
    }

    public class MongoConnect
    {
        private readonly IConfigurationRoot config = ConfigReader.GetConfigFile();

        public IMongoDatabase GetConnection()
        {
            var client = new MongoClient(config["MongoConnection:ConnectionString"]);
            var database = client.GetDatabase(config["MongoConnection:Database"]);
            return database;
        }
    }
}