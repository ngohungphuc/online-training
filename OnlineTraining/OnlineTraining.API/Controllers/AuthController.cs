using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OnlineTraining.Entities.Auth;
using OnlineTraining.Repositories.Interfaces;

namespace OnlineTraining.API.Controllers
{
    public class AuthController: Controller
    {
        private IOptions<Audience> _settings;
        private IRTokenRepository _tokenRepository;

        public AuthController(IOptions<Audience> settings, IRTokenRepository repo)
        {
            _settings = settings;
            _tokenRepository = repo;
        }

        [HttpGet("auth")]
        public IActionResult Auth([FromQuery] Parameters parameters)
        {
            if (parameters == null)
            {
                return Json(new ResponseData
                {
                    Code = "901",
                    Message = "null of params",
                    Data = null
                });
            }

            if (parameters.grant_type == "password")
            {
                return Json(DoPassword(parameters));
            }
            else if (parameters.grant_type == "refresh_token")
            {
                return Json(DoRefreshToken(parameters));
            }
            else
            {
                return Json(new ResponseData
                {
                    Code = "904",
                    Message = "bad request",
                    Data = null
                });
            }
        }
    }
}
