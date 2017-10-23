using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using Newtonsoft.Json;
using OnlineTraining.Entities.Auth;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Repositories.Interfaces;

namespace OnlineTraining.API.Controllers
{
    public class AuthController : Controller
    {
        private readonly IOptions<Audience> _settings;
        private readonly IRTokenRepository _tokenRepository;
        private readonly IGenericRepository<User, ObjectId> _userRepository;
        public AuthController(
            IOptions<Audience> settings,
            IGenericRepository<User, ObjectId> userRepository,
            IRTokenRepository tokenRepository)
        {
            _settings = settings;
            _userRepository = userRepository;
            _tokenRepository = tokenRepository;
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
        /// get the access-token by username and password  
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        private async Task<ResponseData> DoPassword(Parameters parameters)
        {
            //validate the client_id/client_secret/username/password 
            var isValidated = await _userRepository
                .FindOne(x => x.UserName == parameters.username
                    && x.Password == parameters.password);

            if (isValidated == null)
            {
                return new ResponseData
                {
                    Code = "902",
                    Message = "invalid user infomation",
                    Data = null
                };
            }

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
            {
                return new ResponseData
                {
                    Code = "999",
                    Message = "Ok",
                    Data = GetJwt(parameters.client_id, refresh_token)
                };
            }
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
            {
                return new ResponseData
                {
                    Code = "905",
                    Message = "can not refresh token",
                    Data = null
                };
            }

            if (token.IsStop == 1)
            {
                return new ResponseData
                {
                    Code = "906",
                    Message = "refresh token has expired",
                    Data = null
                };
            }

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
            {
                return new ResponseData
                {
                    Code = "999",
                    Message = "Ok",
                    Data = GetJwt(parameters.client_id, refresh_token)
                };
            }
            else
            {
                return new ResponseData
                {
                    Code = "910",
                    Message = "can not expire token or a new token",
                    Data = null
                };
            }
        }

        private string GetJwt(string client_id, string refresh_token)
        {
            var now = DateTime.Now;

            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, client_id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, now.ToUniversalTime().ToString(),ClaimValueTypes.Integer64)
            };

            var symmetricKeyAsBase64 = _settings.Value.Secrect;
            var keyByteArray = Encoding.ASCII.GetBytes(symmetricKeyAsBase64);
            var signingKey = new SymmetricSecurityKey(keyByteArray);

            var jwt = new JwtSecurityToken(
                issuer: _settings.Value.Iss,
                audience: _settings.Value.Aud,
                claims: claims,
                notBefore: now,
                expires: now.Add(TimeSpan.FromMinutes(2)),
                signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
                );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                expires_in = (int)TimeSpan.FromMinutes(2).TotalSeconds,
                refresh_token = refresh_token,
            };

            return JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented });
        }
    }
}
