using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace OnlineTraining.Entities.Db
{
    public interface IMongoConnect
    {
        IMongoDatabase GetConnection();
    }
    public class MongoConnect
    {
        public IConfigurationRoot Configuration { get; }
        public IMongoDatabase GetConnection()
        {
            var client = new MongoClient(Configuration.GetSection("MongoConnection:ConnectionString").Value);
            var database = client.GetDatabase(Configuration.GetSection("MongoConnection:Database").Value);
            return database;
        }
    }
}
