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
