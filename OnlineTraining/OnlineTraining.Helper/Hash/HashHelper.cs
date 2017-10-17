using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace OnlineTraining.Helper.Hash
{
    public static class HashHelper
    {
        public static string Sha512(string input)
        {
            using (var sha = SHA512.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(input);
                var hash = sha.ComputeHash(bytes);

                return Convert.ToBase64String(hash);
            }
        }
    }
}
