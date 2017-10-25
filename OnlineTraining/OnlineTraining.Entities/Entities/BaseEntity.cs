using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace OnlineTraining.Entities.Entities
{
    public interface IBaseEntity<TKey>
    {
        /// <summary>
        ///     Gets or sets the Id of the Entity.
        /// </summary>
        /// <value>Id of the Entity.</value>
        [BsonId]
        TKey Id { get; set; }
    }

    public class BaseEntity : IBaseEntity<ObjectId>
    {
        public DateTime CreatedDate { get; set; }
        public DateTime ModifieddDate { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public virtual ObjectId Id { get; set; }
    }
}