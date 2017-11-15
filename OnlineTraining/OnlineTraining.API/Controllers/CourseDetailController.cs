using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Entities.ViewModels;
using OnlineTraining.Services.Interfaces;

namespace OnlineTraining.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class CourseDetailController: Controller
    {
        private readonly ICourseDetailServices _courseDetailServices;

        public CourseDetailController(ICourseDetailServices courseDetailServices)
        {
            _courseDetailServices = courseDetailServices;
        }

        [HttpGet("{courseId}")]
        public async Task<List<CourseDetailViewModel>> GetCourseDetailByCourseId(string courseId)
        {
            return await _courseDetailServices.GetCourseDetailByCourseId(courseId);
        }
    }
}
