using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Entities.ViewModels;

namespace OnlineTraining.Services.Interfaces
{
    public interface ICourseDetailServices
    {
        Task<List<CourseDetailViewModel>> GetCourseDetailByCourseId(string courseId);
    }
}
