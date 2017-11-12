using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using OnlineTraining.Entities.Entities;

namespace OnlineTraining.Repositories.Interfaces
{
    public interface IBookmarkRepository
    {
        Task<List<Bookmark>> GetBookMarkByUserId(string userId);
        Task<bool> BookmarkCourse(string courseId, string userId);
        Task<bool> UnBookmarkCourse(string courseId, string userId);
    }
}
