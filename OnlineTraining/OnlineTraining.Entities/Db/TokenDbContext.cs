using System;
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
            var curDir = Directory.GetCurrentDirectory();
            curDir = curDir.Substring(0, curDir.LastIndexOf("OnlineTraining.API", StringComparison.Ordinal));
            var dbPath = string.Format("{0}{1}", curDir, "OnlineTraining.Entities");
            var connStr = Path.Combine(dbPath, "jwt.db");
            optionsBuilder.UseSqlite($"Data Source={connStr}");
        }
    }
}