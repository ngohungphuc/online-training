using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using OnlineTraining.Entities.Db;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Repositories.Interfaces;

namespace OnlineTraining.Repositories.Repositories
{
    public class BookmarkRepository : IBookmarkRepository
    {
        private readonly IMongoCollection<Bookmark> _bookmarkRepository;

        public BookmarkRepository()
        {
            var mongoConnect = new MongoConnect();
            _bookmarkRepository = mongoConnect.GetConnection().GetCollection<Bookmark>("Bookmarks");
        }

        public async Task<List<Bookmark>> GetBookMarkByUserId(string userId)
        {
            var bookmarkList = await
                _bookmarkRepository.Find(bm => bm.UserId == userId).ToListAsync();
            return bookmarkList;
        }

        public async Task<bool> BookmarkCourse(string courseId, string userId)
        {
            var bookmarkExist =
                 _bookmarkRepository.Find(bm => bm.CourseId == courseId && bm.UserId == userId);
            if (bookmarkExist.Count() > 0) return false;
            var bookmark = new Bookmark
            {
                CourseId = courseId,
                UserId = userId,
                CreatedDate = DateTime.Now,
                ModifieddDate = DateTime.Now
            };
            await _bookmarkRepository.InsertOneAsync(bookmark);
            return true;
        }

        public async Task<bool> UnBookmarkCourse(string courseId, string userId)
        {
            await _bookmarkRepository.FindOneAndDeleteAsync(bm => bm.CourseId == courseId && bm.UserId == userId);
            return true;
        }
    }
}
