using System;
using System.Collections.Generic;
using System.Text;
using OnlineTraining.Entities.Entities;

namespace OnlineTraining.Entities.ViewModels
{
    public class CourseDetailViewModel
    {
        public CourseDetail CourseDetail { get; set; }
        public List<CourseDetail> CourseModule { get; set; }
    }
}
