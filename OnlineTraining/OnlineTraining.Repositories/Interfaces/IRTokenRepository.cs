using System.Collections.Generic;
using OnlineTraining.Entities.Auth;

namespace OnlineTraining.Repositories.Interfaces
{
    public interface IRTokenRepository
    {
        bool AddToken(RToken token);

        bool ExpireToken(RToken token);

        List<RToken> GetAllToken();

        RToken GetToken(string refreshToken, string clientId);
    }
}