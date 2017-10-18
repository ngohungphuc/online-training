using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OnlineTraining.Entities.Auth;
using OnlineTraining.Entities.Db;
using OnlineTraining.Repositories.Interfaces;

namespace OnlineTraining.Repositories.Repositories
{
    public class RTokenRepository: IRTokenRepository
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

        public RToken GetToken(string refreshToken, string clientId)
        {
            using (var db = new TokenDbContext())
            {
                return db.RTokens.FirstOrDefault(x => x.ClientId == clientId && x.RefreshToken == refreshToken);
            }
        }
    }
}
