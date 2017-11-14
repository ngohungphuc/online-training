using MongoDB.Bson;

namespace OnlineTraining.Entities.Entities
{
    public class CourseDetail : BaseEntity
    {
        public string ModuleId { get; set; }
        public int? Order { get; set; }
        public string Title { get; set; }
        public string CourseId { get; set; }
        public string CourseMediaId { get; set; }
    }
}