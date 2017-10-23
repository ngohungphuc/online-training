using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using OnlineTraining.Entities.Db;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Helper.Hash;
using OnlineTraining.Repositories.Interfaces;

namespace OnlineTraining.Scripts
{
    public class OnlineTrainingSeed
    {
        private static readonly PasswordManager _passwordManager = new PasswordManager();
        private static readonly MongoClient client = new MongoClient("mongodb://localhost:27017");
        private static readonly IMongoDatabase database = client.GetDatabase("online-training");
        public static async Task AddUserToDb()
        {
            var repo = database.GetCollection<User>("users");

            var userList = new List<User>()
            {
                new User()
                {
                    Email = "ngohungphuc95@gmail.com",
                    UserName = "phucngo",
                    Password = "070695",
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Id = new ObjectId("59ee1ba3acf7c53bf4d2504c")
                },
                new User()
                {
                    Email = "ngohungphuc7695@gmail.com",
                    UserName = "phucngo1",
                    Password = "070695",
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Id = new ObjectId("59ee1ba3acf7c53bf4d2504d")
                }
            };

            foreach (var user in userList)
            {
                var matchedProfile = repo.Find(x => x.Id == user.Id).Count();
                if (matchedProfile == 0)
                {
                    await repo.InsertManyAsync(userList);
                }
            }
        }
    }
}
