using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using OnlineTraining.Entities.Db;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Helper.Config;
using OnlineTraining.Repositories.Interfaces;

namespace OnlineTraining.Repositories.Repositories
{
    public class LearningPathRepository: ILearningPathRepository
    {
        private readonly IMongoCollection<LearningPath> _learningPathRepository;
        public LearningPathRepository(IOptions<OtaConfig> config)
        {
            var mongoConnect = new MongoContext(config);
            _learningPathRepository = mongoConnect.GetConnection().GetCollection<LearningPath>("LearningPaths");
        }
        public async Task<List<LearningPath>> GetAlLearningPaths()
        {
            return await _learningPathRepository.Find(path => true).ToListAsync();
        }
    }
}
