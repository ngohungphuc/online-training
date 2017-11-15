using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Entities.ViewModels;
using OnlineTraining.Repositories.Interfaces;
using OnlineTraining.Services.Interfaces;

namespace OnlineTraining.Services.Services
{
    public class CourseDetailServices : ICourseDetailServices
    {
        private readonly ICourseDetailRepository _courseDetailRepository;

        public CourseDetailServices(ICourseDetailRepository courseDetailRepository)
        {
            _courseDetailRepository = courseDetailRepository;
        }

        public async Task<List<CourseDetailViewModel>> GetCourseDetailByCourseId(string courseId)
        {
            return await _courseDetailRepository.GetCourseDetailByCourseId(courseId);
        }
    }
}
