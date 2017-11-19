using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using OnlineTraining.Entities.Entities;

namespace OnlineTraining.Repositories.Interfaces
{
    public interface ICourseMediaRepository
    {
        Task<CourseMedia> GetCourseMediaByCourseId(string courseMediaId);
    }
}
