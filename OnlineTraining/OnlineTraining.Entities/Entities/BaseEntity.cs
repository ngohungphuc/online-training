using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace OnlineTraining.Entities.Entities
{
    public class BaseEntity
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifieddDate { get; set; }
    }
}