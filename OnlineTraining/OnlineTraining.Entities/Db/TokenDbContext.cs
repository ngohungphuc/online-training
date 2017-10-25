using System.IO;
using Microsoft.EntityFrameworkCore;
using OnlineTraining.Entities.Auth;

namespace OnlineTraining.Entities.Db
{
    public class TokenDbContext : DbContext
    {
        public DbSet<RToken> RTokens { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connStr = Path.Combine(Directory.GetCurrentDirectory(), "jwt.db");
            optionsBuilder.UseSqlite($"Data Source={connStr}");
        }
    }
}