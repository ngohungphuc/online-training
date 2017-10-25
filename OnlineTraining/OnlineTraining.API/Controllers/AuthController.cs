using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using OnlineTraining.Entities.Auth;
using OnlineTraining.Repositories.Interfaces;
using OnlineTraining.Services.Interfaces;

namespace OnlineTraining.API.Controllers
{
    public class AuthController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IRTokenRepository _tokenRepository;
        private readonly IUserServices _userServices;

        public AuthController(
            IConfiguration configuration,
            IUserServices userServices,
            IRTokenRepository tokenRepository)
        {
            _configuration = configuration;
            _userServices = userServices;
            _tokenRepository = tokenRepository;
        }

        [HttpGet("auth")]
        public IActionResult Auth([FromQuery] Parameters parameters)
        {
            if (parameters == null)
                return Json(new ResponseData
                {
                    Code = "901",
                    Message = "null of params",
                    Data = null
                });

            switch (parameters.grant_type)
            {
                case "password":
                    return Json(DoPassword(parameters));
                case "refresh_token":
                    return Json(GenerateRefreshToken(parameters));
                default:
                    return Json(new ResponseData
                    {
                        Code = "904",
                        Message = "bad request",
                        Data = null
                    });
            }
        }

        /// <summary>
        ///     get the access-token by username and password
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        private ResponseData DoPassword(Parameters parameters)
        {
            //validate the client_id/client_secret/username/password 
            var isValidated = _userServices.Authentication(parameters.username, parameters.password);

            if (!isValidated)
                return new ResponseData
                {
                    Code = "902",
                    Message = "invalid user infomation",
                    Data = null
                };

            var refresh_token = Guid.NewGuid().ToString().Replace("-", "");
            var rToken = new RToken
            {
                ClientId = parameters.client_id,
                RefreshToken = refresh_token,
                Id = new Guid().ToString(),
                IsStop = 0
            };

            //store the refresh_token   
            if (_tokenRepository.AddToken(rToken))
                return new ResponseData
                {
                    Code = "999",
                    Message = "Ok",
                    Data = GetJwt(parameters.client_id, refresh_token)
                };
            return new ResponseData
            {
                Code = "909",
                Message = "can not add token to database",
                Data = null
            };
        }

        private ResponseData GenerateRefreshToken(Parameters parameters)
        {
            var token = _tokenRepository.GetToken(parameters.refresh_token, parameters.client_id);

            if (token == null)
                return new ResponseData
                {
                    Code = "905",
                    Message = "can not refresh token",
                    Data = null
                };

            if (token.IsStop == 1)
                return new ResponseData
                {
                    Code = "906",
                    Message = "refresh token has expired",
                    Data = null
                };

            var refresh_token = Guid.NewGuid().ToString().Replace("-", "");

            token.IsStop = 1;
            //expire the old refresh_token and add a new refresh_token  
            var updateFlag = _tokenRepository.ExpireToken(token);

            var addFlag = _tokenRepository.AddToken(new RToken
            {
                ClientId = parameters.client_id,
                RefreshToken = refresh_token,
                Id = Guid.NewGuid().ToString(),
                IsStop = 0
            });

            if (updateFlag && addFlag)
                return new ResponseData
                {
                    Code = "999",
                    Message = "Ok",
                    Data = GetJwt(parameters.client_id, refresh_token)
                };
            return new ResponseData
            {
                Code = "910",
                Message = "can not expire token or a new token",
                Data = null
            };
        }

        private string GetJwt(string client_id, string refresh_token)
        {
            var now = DateTime.Now;

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, client_id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, now.ToUniversalTime().ToString(), ClaimValueTypes.Integer64)
            };

            var symmetricKeyAsBase64 = _configuration["Audience:Secret"];
            var keyByteArray = Encoding.ASCII.GetBytes(symmetricKeyAsBase64);
            var signingKey = new SymmetricSecurityKey(keyByteArray);

            var jwt = new JwtSecurityToken(
                _configuration["Audience:Iss"],
                _configuration["Audience:Aud"],
                claims,
                now,
                now.Add(TimeSpan.FromMinutes(2)),
                new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
            );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                expires_in = (int) TimeSpan.FromMinutes(2).TotalSeconds,
                refresh_token
            };

            return JsonConvert.SerializeObject(response, new JsonSerializerSettings {Formatting = Formatting.Indented});
        }
    }
}