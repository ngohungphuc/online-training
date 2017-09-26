using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Driver;

namespace OnlineTraining.Helper.Db
{
    public interface IMongoConnect
    {
        IMongoDatabase GetConnection();
    }
    public class MongoConnect
    {
        public IMongoDatabase GetConnection()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("online-training");
            return database;
        }
    }
}
