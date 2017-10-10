using MongoDB.Bson;

namespace OnlineTraining.Entities.Entities
{
    public class Comment
    {
        public ObjectId CommentId { get; set; }
        public string Content { get; set; }
        public ObjectId UserCommentId { get; set; }
        public string UserCommentName { get; set; }
    }
}
