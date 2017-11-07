using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Services.Interfaces;

namespace OnlineTraining.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class LearningPathController : Controller
    {
        private readonly ILearningPathServices _learningPathServices;

        public LearningPathController(ILearningPathServices learningPathServices)
        {
            _learningPathServices = learningPathServices;
        }

        [HttpGet]
        public async Task<List<LearningPath>> Get()
        {
            return await _learningPathServices.GetAlLearningPaths();
        }

    }
}
