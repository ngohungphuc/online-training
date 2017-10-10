using MongoDB.Bson;

namespace OnlineTraining.Entities.Entities
{
    public class Message: BaseEntity
    {
        public ObjectId SenderId { get; set; }
        public string SenderName { get; set; }
        public ObjectId RecieverId { get; set; }
        public string RecieverName { get; set; }

    }
}
