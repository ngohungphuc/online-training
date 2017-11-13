using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineTraining.Services.Interfaces;

namespace OnlineTraining.API.Controllers
{

    [Route("api/[controller]/[action]")]
    public class BookmarkController : Controller
    {
        private readonly IBookmarkServices _bookmarkServices;

        public BookmarkController(IBookmarkServices bookmarkServices)
        {
            _bookmarkServices = bookmarkServices;
        }

        /// <summary>
        /// Get bookmark status to compare
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetBookMarkByUserId(string userId)
        {
            var bookmarks = await _bookmarkServices.GetBookMarkByUserId(userId);
            return Ok(bookmarks);
        }

        /// <summary>
        /// Get course by user bookmark
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCourseBookMarkByUserId(string userId)
        {
            var bookmarks = await _bookmarkServices.GetCourseBookMarkByUserId(userId);
            return Ok(bookmarks);
        }


        [HttpGet("{courseId}/{userId}")]
        public async Task<IActionResult> BookMarkCourse(string courseId, string userId)
        {
            await _bookmarkServices.BookmarkCourse(courseId, userId);
            return Ok();
        }

        [HttpGet("{courseId}/{userId}")]
        public async Task<IActionResult> UndoBookMarkCourse(string courseId, string userId)
        {
            await _bookmarkServices.UnBookmarkCourse(courseId, userId);
            return Ok();
        }
    }
}
