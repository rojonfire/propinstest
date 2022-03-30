using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Corretaje.Api.Commons.SecurityHelper
{
    public class TokenHelper : ITokenHelper
    {
        private readonly ITokenConfiguration _tokenConfiguration;
        private readonly JwtSecurityTokenHandler _tokenHandler;

        public TokenHelper(ITokenConfiguration tokenConfiguration)
        {
            _tokenConfiguration = tokenConfiguration;
            _tokenHandler = new JwtSecurityTokenHandler();
        }

        public string GenerarTokenUsuarioLogin(string usuarioId)
        {
            double sieteDias = 7;
            var tokenExpiracion = DateTime.UtcNow.AddDays(sieteDias);
            return GenerarToken(new Claim(ClaimTypes.Name, usuarioId), tokenExpiracion);
        }

        public string GenerarTokenUsuarioRecuperarContraseña(string usuarioEMail)
        {
            double diezMinutos = 10;
            var tokenExpiracion = DateTime.UtcNow.AddMinutes(diezMinutos);
            return GenerarToken(new Claim(ClaimTypes.Email, usuarioEMail), tokenExpiracion);
        }

        private string GenerarToken(Claim claim, DateTime tokenExpiracion)
        {
            var tokenInformacionContenida = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims: new[]
                {
                    claim
                }),
                Expires = tokenExpiracion,
                SigningCredentials = GetCredencialesFirmaToken()
            };

            var token = _tokenHandler.CreateToken(tokenInformacionContenida);

            return _tokenHandler.WriteToken(token);
        }

        private SigningCredentials GetCredencialesFirmaToken()
        {
            var key = Encoding.ASCII.GetBytes(_tokenConfiguration.Secret);
            return new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);
        }
    }
}
