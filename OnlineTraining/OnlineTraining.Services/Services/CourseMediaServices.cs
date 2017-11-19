using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Repositories.Interfaces;
using OnlineTraining.Services.Interfaces;

namespace OnlineTraining.Services.Services
{
    public class CourseMediaServices: ICourseMediaServices
    {
        private readonly ICourseMediaRepository _courseMediaRepository;

        public CourseMediaServices(ICourseMediaRepository courseMediaRepository)
        {
            _courseMediaRepository = courseMediaRepository;
        }

        public async Task<CourseMedia> GetCourseMediaByCourseId(string courseMediaId)
        {
            return await _courseMediaRepository.GetCourseMediaByCourseId(courseMediaId);
        }
    }
}
