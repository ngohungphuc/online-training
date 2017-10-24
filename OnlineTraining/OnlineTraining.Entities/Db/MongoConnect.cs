using System.IO;
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
       
        public IMongoDatabase GetConnection()
        {
            var client = new MongoClient(ConfigReader.GetConfigFile()["MongoConnection:ConnectionString"]);
            var database = client.GetDatabase(ConfigReader.GetConfigFile()["MongoConnection:Database"]);
            return database;
        }
    }
}
