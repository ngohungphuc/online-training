using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using OnlineTraining.Entities.Db;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Helper.Config;
using OnlineTraining.Helper.Hash;
using OnlineTraining.Repositories.Interfaces;

namespace OnlineTraining.Repositories.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _userRepository;
        private readonly IOptions<OtaConfig> config;

        public UserRepository(IOptions<OtaConfig> Config)
        {
            config = Config;
            var mongoConnect = new MongoContext(config);
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