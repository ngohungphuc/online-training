using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using OnlineTraining.Entities.Entities;

namespace OnlineTraining.Services.Interfaces
{
    public interface ICourseServices
    {
        Task<List<Course>> GetCourseByPathId(string pathId);
    }
}
