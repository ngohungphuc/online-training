using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace OnlineTraining.Helper.Hash
{
    public static class PasswordManager
    {
        public static string Encrpyted(string input)
        {
            var encryptionKey = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var result = input;
            var clearBytes = Encoding.Unicode.GetBytes(result);

            using (var encrytor = Aes.Create())
            {
                var pdb = new Rfc2898DeriveBytes(encryptionKey, new byte[]
                {
                    0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76
                });

                encrytor.Key = pdb.GetBytes(32);
                encrytor.IV = pdb.GetBytes(16);

                using (var ms = new MemoryStream())
                {
                    using (var cs = new CryptoStream(ms, encrytor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    result = Convert.ToBase64String(ms.ToArray());
                }
            }
            return result;
        }

        public static string Decrypt(string input)
        {
            var EncryptionKey = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var result = input;
            result.Replace(" ", "+");
            var cipherBytes = Convert.FromBase64String(input);

            using (var encryptor = Aes.Create())
            {
                var pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[]
                {
                    0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76
                });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);

                using (var ms = new MemoryStream())
                {
                    using (var cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    result = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return result;
        }
    }
}