using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using HashAndSalt;

namespace TestHashAndSalt
{
    class Program
    {
        // Dummy repository class for DB operations
        static MockUserRepository userRepo = new MockUserRepository();

        // Let us use the Password manager class to generate the password ans salt
        static PasswordManager pwdManager = new PasswordManager();

        static void Main(string[] args)
        {
            // Let us first test the password hash creation i.e. User creation
            string salt = SimulateUserCreation();

            // Now let is simualte the password comparison
            SimulateLogin(salt);

            Console.ReadLine();
        }

        public static string SimulateUserCreation()
        {
            Console.WriteLine("Let us first test the password hash creation i.e. User creation");
            Console.WriteLine("Please enter user id");
            string userid = Console.ReadLine();

            Console.WriteLine("Please enter password");
            string password = Console.ReadLine();

            string salt = null;

            string passwordHash = pwdManager.GeneratePasswordHash(password, out salt);

            // Let us save the values in the database
            User user = new User
            {
                UserId = userid,
                PasswordHash = passwordHash,
                Salt = salt
            };

            // Lets Add the User to the database
            userRepo.AddUser(user);

            return salt;
        }

        public static void SimulateLogin(string salt)
        {            
            Console.WriteLine("Now let is simulate the password comparison");

            Console.WriteLine("Please enter user id");
            string userid = Console.ReadLine();

            Console.WriteLine("Please enter password");
            string password = Console.ReadLine();

            // Let us retrieve the values from the database
            User user2 = userRepo.GetUser(userid);
            
            bool result = pwdManager.IsPasswordMatch(password, user2.Salt, user2.PasswordHash);

            if (result == true)
            {
                Console.WriteLine("Password Matched");
            }
            else
            {
                Console.WriteLine("Password not Matched");
            }
        }
    }
}
