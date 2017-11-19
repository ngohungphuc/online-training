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
    public class CourseMediaRepository: ICourseMediaRepository
    {
        private readonly IMongoCollection<CourseMedia> _courseMediaRepository;

        public CourseMediaRepository(IOptions<OtaConfig> config)
        {
            var mongoConnect = new MongoContext(config);
            _courseMediaRepository = mongoConnect.GetConnection().GetCollection<CourseMedia>("CourseMedias");
        }

        public async Task<CourseMedia> GetCourseMediaByCourseId(string courseMediaId)
        {
            return await _courseMediaRepository.Find(cm => cm.Id == courseMediaId).SingleOrDefaultAsync();
        }
    }
}
