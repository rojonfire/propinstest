using Corretaje.Service.IServices.ILogin;
using Corretaje.Service.IServices.ILogin.IProvider.IFacebook;
using Corretaje.Service.IServices.ILogin.IProvider.IGoogle;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Login
{
    public class LoginService : ILoginService
    {
        private readonly IFacebookToken _facebookToken;
        private readonly IGoogleToken _googleToken;

        public LoginService(IFacebookToken facebookToken, IGoogleToken googleToken)
        {
            _facebookToken = facebookToken;
            _googleToken = googleToken;
        }

        public async Task<bool> FacebookTokenUsuarioEsValido(string token)
        {
            return await _facebookToken.TokenUsuarioEsValido(token);
        }

        public async Task<bool> GoogleTokenUsuarioEsValido(string token)
        {
            return await _googleToken.TokenUsuarioEsValido(token);
        }
    }
}
