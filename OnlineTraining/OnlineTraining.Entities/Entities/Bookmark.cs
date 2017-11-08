using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineTraining.Entities.Entities
{
    public class Bookmark : BaseEntity
    {
        public string UserId { get; set; }
        public string CourseId { get; set; }
    }
}
