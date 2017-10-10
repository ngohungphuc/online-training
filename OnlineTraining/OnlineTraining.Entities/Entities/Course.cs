namespace OnlineTraining.Entities.Entities
{
    public class Course: BaseEntity
    {
        public string CourseName { get; set; }
        public string ShortDescription { get; set; }
        public string CreatedBy { get; set; }
        public string TargetAudience { get; set; }
    }
}
