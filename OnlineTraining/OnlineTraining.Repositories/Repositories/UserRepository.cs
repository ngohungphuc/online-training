using MongoDB.Bson;
using MongoDB.Driver;
using OnlineTraining.Entities.Db;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Helper.Hash;
using OnlineTraining.Repositories.Interfaces;

namespace OnlineTraining.Repositories.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _userRepository;

        public UserRepository()
        {
            var mongoConnect = new MongoConnect();
            _userRepository = mongoConnect.GetConnection().GetCollection<User>("Users");
        }

        public bool Authentication(string username, string password)
        {
            var result = _userRepository.Find(x => x.UserName == username
                        && x.Password == PasswordManager.Encrpyted(password));

            return result.Count() > 0;
        }

        public string GetUserIdByName(string username)
        {
            var result = _userRepository.Find(x => x.UserName == username).SingleOrDefault();
            return result.Id;
        }
    }
}