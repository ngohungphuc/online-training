using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
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
        private static MongoConnect mongoConnect = new MongoConnect();
        public static async Task AddUserToDb()
        {
            var repo = mongoConnect.GetConnection().GetCollection<User>("users");

            var userList = new List<User>()
            {
                new User()
                {
                    Email = "ngohungphuc95@gmail.com",
                    UserName = "phucngo",
                    Password = PasswordManager.Encrpyted("070695"),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Id = new ObjectId("59ee1ba3acf7c53bf4d2504c")
                },
                new User()
                {
                    Email = "ngohungphuc7695@gmail.com",
                    UserName = "phucngo1",
                    Password = PasswordManager.Encrpyted("070695"),
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
