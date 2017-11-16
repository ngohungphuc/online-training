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
    public class CourseRepository: ICourseRepository
    {
        private readonly IMongoCollection<Course> _courseRepository;
        private readonly IOptions<OtaConfig> config;
        public CourseRepository(IOptions<OtaConfig> Config)
        {
            config = Config;
            var mongoConnect = new MongoContext(config);
            _courseRepository = mongoConnect.GetConnection().GetCollection<Course>("Courses");
        }

        public async Task<List<Course>> GetCourseByPathId(string pathId)
        {
            return await _courseRepository.Find(c => c.LearningPathId == pathId).ToListAsync();
        }
    }
}
