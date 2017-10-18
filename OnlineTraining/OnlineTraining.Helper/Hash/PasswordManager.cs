using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineTraining.Helper.Hash
{
    public class PasswordManager
    {
        readonly HashCompute hashCompute = new HashCompute();

        public string GenerateHashPassword(string plainTextPassword, out string salt)
        {
            salt = HashHelper.GetSaltString();

            string finalString = plainTextPassword + salt;

            return hashCompute.GetPasswordHashAndSalt(finalString);
        }

        public bool IsPasswordMatch(string password, string salt, string hash)
        {
            string finalString = password + salt;
            return hash == hashCompute.GetPasswordHashAndSalt(finalString);
        }
    }
}
