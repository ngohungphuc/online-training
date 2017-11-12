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
            {
                return Json(new ResponseData
                {
                    Code = "901",
                    Message = "null of params",
                    Data = null
                });
            }

            var isValidated = _userServices.Authentication(parameters.username.Trim(), parameters.password.Trim());

            if (!isValidated)
            {
                return BadRequest();
            }

            switch (parameters.grant_type)
            {
                case "password":
                    return Ok(GenerateJwt(parameters));
                case "refresh_token":
                    return Ok(GenerateRefreshToken(parameters));
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
        private ResponseData GenerateJwt(Parameters parameters)
        {
            var refresh_token = Guid.NewGuid().ToString().Replace("-", "");
            var rToken = new RToken
            {
                ClientName = parameters.username,
                RefreshToken = refresh_token,
                Id = Guid.NewGuid().ToString(),
                IsStop = 0
            };

            //store the refresh_token   
            if (_tokenRepository.AddToken(rToken))
            {
                return new ResponseData
                {
                    Code = "999",
                    Message = "Ok",
                    Data = GetJwt(parameters.username.Trim(), refresh_token)
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
            var token = _tokenRepository.GetToken(parameters.refresh_token.Trim(), parameters.username.Trim());

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
                ClientName = parameters.username.Trim(),
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
                    Data = GetJwt(parameters.username.Trim(), refresh_token)
                };
            }

            return new ResponseData
            {
                Code = "910",
                Message = "can not expire token or a new token",
                Data = null
            };
        }

        private string GetJwt(string client_name, string refresh_token)
        {
            var now = DateTime.Now;

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, client_name.Trim()),
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
                now.Add(TimeSpan.FromMinutes(120)),
                new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
            );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                expires_in = (int)TimeSpan.FromMinutes(120).TotalSeconds,
                refresh_token = refresh_token.Trim(),
                account = client_name.Trim(),
                userId = _userServices.GetUserIdByName(client_name)
            };

            return JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented });
        }
    }
}