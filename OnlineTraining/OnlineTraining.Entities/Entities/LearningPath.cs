using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineTraining.Entities.Entities
{
    public class LearningPath : BaseEntity
    {
        public string Name { get; set; }
        public string Slug { get; set; }
        public int TotalCourses { get; set; }
        public string PathIcon { get; set; }
        public string LearningPathDescription { get; set; }
    }
}
