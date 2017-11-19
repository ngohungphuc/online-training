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
    [Route("api/[controller]/[action]")]
    public class CourseMediaController : Controller
    {

        private readonly ICourseMediaServices _courseMediaServices;

        public CourseMediaController(ICourseMediaServices courseMediaServices)
        {
            _courseMediaServices = courseMediaServices;
        }

        [HttpGet("{courseMediaId}")]
        public async Task<CourseMedia> GetCourseMediaByCourseId(string courseMediaId)
        {
            return await _courseMediaServices.GetCourseMediaByCourseId(courseMediaId);
        }
    }
}
