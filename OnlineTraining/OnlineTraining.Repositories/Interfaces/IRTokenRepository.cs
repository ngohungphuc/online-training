using System;
using System.Collections.Generic;
using System.Text;
using OnlineTraining.Entities.Auth;

namespace OnlineTraining.Repositories.Interfaces
{
    public interface IRTokenRepository
    {
        bool AddToken(RToken token);

        bool ExpireToken(RToken token);

        RToken GetToken(string refreshToken, string clientId);
    }
}
