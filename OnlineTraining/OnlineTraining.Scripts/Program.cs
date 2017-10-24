using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
namespace OnlineTraining.Scripts
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("------Begin to seed db------");
            InitializeDb().Wait();
            Console.WriteLine("------Job done------");
        }

        private static async Task InitializeDb()
        {
             await OnlineTrainingSeed.AddUserToDb();
        }
    }
}
