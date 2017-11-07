using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Repositories.Interfaces;
using OnlineTraining.Services.Interfaces;

namespace OnlineTraining.Services.Services
{
    public class LearningPathServices: ILearningPathServices
    {
        private readonly ILearningPathRepository _learningPathRepository;

        public LearningPathServices(ILearningPathRepository learningPathRepository)
        {
            _learningPathRepository = learningPathRepository;
        }
        public async Task<List<LearningPath>> GetAlLearningPaths()
        {
            return await _learningPathRepository.GetAlLearningPaths();
        }
    }
}
