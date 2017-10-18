using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace OnlineTraining.Helper.Hash
{
    /// <summary>
    /// This class responsibility is to generate 
    /// the SHA256 hash value for a given string message.
    /// </summary>
    public class HashCompute
    {
        public string GetPasswordHashAndSalt(string message)
        {
            // use SHA256 algorithm to 
            // generate the hash from this salted password
            SHA256 sha = new SHA256CryptoServiceProvider();
            byte[] dataBytes = Utility.GetBytes(message);
            byte[] resultBytes = sha.ComputeHash(dataBytes);

            //return hash string to the caller
            return Utility.GetString(resultBytes);
        }
    }
}
