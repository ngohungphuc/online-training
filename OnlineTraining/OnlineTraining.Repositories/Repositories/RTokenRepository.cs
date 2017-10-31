using System.Collections.Generic;
using System.Linq;
using OnlineTraining.Entities.Auth;
using OnlineTraining.Entities.Db;
using OnlineTraining.Repositories.Interfaces;

namespace OnlineTraining.Repositories.Repositories
{
    public class RTokenRepository : IRTokenRepository
    {
        public bool AddToken(RToken token)
        {
            using (var db = new TokenDbContext())
            {
                db.RTokens.Add(token);

                return db.SaveChanges() > 0;
            }
        }

        public bool ExpireToken(RToken token)
        {
            using (var db = new TokenDbContext())
            {
                db.RTokens.Update(token);

                return db.SaveChanges() > 0;
            }
        }

        public List<RToken> GetAllToken()
        {
            using (var db = new TokenDbContext())
            {
                return db.RTokens.ToList();
            }
        }

        public RToken GetToken(string refreshToken, string clientName)
        {
            using (var db = new TokenDbContext())
            {
                return db.RTokens.FirstOrDefault(x => x.ClientName == clientName && x.RefreshToken == refreshToken);
            }
        }
    }
}