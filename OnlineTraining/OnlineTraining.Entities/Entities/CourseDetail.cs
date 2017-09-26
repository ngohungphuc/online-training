using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson;

namespace OnlineTraining.Entities.Entities
{
    public class CourseDetail: BaseEntity
    {
        public string Detail { get; set; }
        public ObjectId CourseId { get; set; }
        public ObjectId CourseMediaId { get; set; }
    }
}
