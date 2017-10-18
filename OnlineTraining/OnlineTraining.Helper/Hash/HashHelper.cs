using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace OnlineTraining.Helper.Hash
{
    /// <summary>
    /// This class responsibility is to generate a random 
    /// and unique salt every time.
    /// </summary>
    public static class HashHelper
    {
        private static RNGCryptoServiceProvider m_cryptoServiceProvider = null;
        private const int SALT_SIZE = 24;

        static HashHelper()
        {
            m_cryptoServiceProvider = new RNGCryptoServiceProvider();
        }

        public static string GetSaltString()
        {
            // create a byte array to store the salt bytes
            byte[] saltBytes = new byte[SALT_SIZE];

            // generate the salt in the byte array
            m_cryptoServiceProvider.GetNonZeroBytes(saltBytes);

            // get some string representation for this salt
            string saltString = Utility.GetString(saltBytes);

            return saltString;
        }
    }
}
