using System;
using System.Threading.Tasks;
using MongoDB.Bson;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Helper.Hash;
using OnlineTraining.Repositories.Interfaces;

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
