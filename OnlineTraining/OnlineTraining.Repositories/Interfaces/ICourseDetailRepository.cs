using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Entities.ViewModels;

namespace OnlineTraining.Repositories.Interfaces
{
    public interface ICourseDetailRepository
    {
        Task<List<CourseDetailViewModel>> GetCourseDetailByCourseId(string courseId);
    }
}
