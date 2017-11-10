using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Repositories.Interfaces;
using OnlineTraining.Services.Interfaces;

namespace OnlineTraining.Services.Services
{
    public class CourseServices: ICourseServices
    {
        private readonly ICourseRepository _courseRepository;

        public CourseServices(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        public async Task<Course> GetCourseByPathId(string pathId)
        {
            return await _courseRepository.GetCourseByPathId(pathId);
        }
    }
}
