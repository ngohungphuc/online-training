using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using OnlineTraining.Entities.Entities;

namespace OnlineTraining.Repositories.Interfaces
{
    public interface ILearningPathRepository
    {
        Task<List<LearningPath>> GetAlLearningPaths();
    }
}
