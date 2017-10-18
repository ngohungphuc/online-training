using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using OnlineTraining.Entities.Auth;

namespace OnlineTraining.Entities.Db
{
    public class TokenDbContext: DbContext
    {
        public DbSet<RToken> RTokens { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connStr = Path.Combine(Directory.GetCurrentDirectory(), "jwt.db");
            optionsBuilder.UseSqlite($"Data Source={connStr}");
        }
    }
}
