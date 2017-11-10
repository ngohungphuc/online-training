using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using OnlineTraining.Entities.Db;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Repositories.Interfaces;

namespace OnlineTraining.Repositories.Repositories
{
    public class CourseRepository: ICourseRepository
    {
        private readonly IMongoCollection<Course> _courseRepository;

        public CourseRepository()
        {
            var mongoConnect = new MongoConnect();
            _courseRepository = mongoConnect.GetConnection().GetCollection<Course>("Courses");
        }

        public async Task<Course> GetCourseByPathId(string pathId)
        {
            return await _courseRepository.Find(c => c.LearningPathId == pathId).SingleOrDefaultAsync();
        }
    }
}
