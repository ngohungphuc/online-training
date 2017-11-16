using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using OnlineTraining.Entities.Db;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Entities.ViewModels;
using OnlineTraining.Helper.Config;
using OnlineTraining.Repositories.Interfaces;

namespace OnlineTraining.Repositories.Repositories
{
    public class CourseDetailRepository : ICourseDetailRepository
    {
        private readonly IMongoCollection<CourseDetail> _courseDetailRepository;
        private readonly IOptions<OtaConfig> config;
        public CourseDetailRepository(IOptions<OtaConfig> Config)
        {
            config = Config;
            var mongoConnect = new MongoContext(config);
            _courseDetailRepository = mongoConnect.GetConnection().GetCollection<CourseDetail>("CourseDetails");
        }

        public async Task<List<CourseDetailViewModel>> GetCourseDetailByCourseId(string courseId)
        {
            var data = new List<CourseDetailViewModel>();
            var courseModule = await _courseDetailRepository.Find(c => c.CourseId == courseId && c.ModuleId == string.Empty).ToListAsync();
            foreach (var course in courseModule)
            {
                var courseChild = await _courseDetailRepository.Find(c => c.ModuleId == course.Id).ToListAsync();
                var returnData = new CourseDetailViewModel
                {
                    CourseDetail = course,
                    CourseModule = courseChild
                };
                data.Add(returnData);
            }
            return data;
        }
    }
}
