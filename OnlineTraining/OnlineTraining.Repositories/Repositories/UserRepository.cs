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
        private readonly MongoConnect _mongoConnect;
        private readonly IMongoCollection<User> _userRepository;

        public UserRepository()
        {
            _mongoConnect = new MongoConnect();
            _userRepository = _mongoConnect.GetConnection().GetCollection<User>("users");
        }

        public bool Authentication(string username, string password)
        {
   
            var result = _userRepository.Find(x => x.UserName == username
                                                      && x.Password == PasswordManager.Encrpyted(password));
            return result != null;
        }
    }
}