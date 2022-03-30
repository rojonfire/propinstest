using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Corretaje.Domain
{
    public class TokenZoomApi
    {
        public static string Generate(string key, string secret)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var header = new JwtHeader(credentials);
            var payload = new JwtPayload
            {
                { "iss", $"{key}"},
                { "exp", DateTimeOffset.Now.ToUnixTimeSeconds() + 1400 },
            };

            var secToken = new JwtSecurityToken(header, payload);
            var handler = new JwtSecurityTokenHandler();

            return handler.WriteToken(secToken);
        }
    }
}
