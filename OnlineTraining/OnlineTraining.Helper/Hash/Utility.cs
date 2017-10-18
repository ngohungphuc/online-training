using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineTraining.Helper.Hash
{
    static class Utility
    {
        // utilty function to convert string to byte[]        
        public static byte[] GetBytes(string str)
        {
            byte[] bytes = new byte[str.Length * sizeof(char)];
            Buffer.BlockCopy(str.ToCharArray(),0 , bytes, 0 , bytes.Length);
            return bytes;
        }

        // utilty function to convert byte[] to string        
        public static string GetString(byte[] bytes)
        {
            char[] chars = new char[bytes.Length / sizeof(char)];
            System.Buffer.BlockCopy(bytes, 0, chars, 0, bytes.Length);
            return new string(chars);
        }
    }
}
