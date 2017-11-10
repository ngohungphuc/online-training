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
    //[Authorize]
    [Route("api/[controller]/[action]")]
    public class CourseController: Controller
    {
        private readonly ICourseServices _courseServices;

        public CourseController(ICourseServices courseServices)
        {
            _courseServices = courseServices;
        }

        [HttpGet]
        public async Task<Course> GetCourseByPathId(string pathId)
        {
            return await _courseServices.GetCourseByPathId(pathId);
        }
    }
}
