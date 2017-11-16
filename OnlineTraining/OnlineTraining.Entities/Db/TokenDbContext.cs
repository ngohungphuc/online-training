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
            optionsBuilder.UseSqlite($"Data Source=jwt.db");
        }
    }
}