using System;
using MongoDB.Bson;
namespace OnlineTraining.Entities.Entities
{
    public class BaseEntity
    {
        public Guid _id { get; set; }
        public ObjectId Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifieddDate { get; set; }
    }
}
