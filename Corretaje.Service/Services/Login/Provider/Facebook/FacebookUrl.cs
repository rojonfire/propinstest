using Corretaje.Service.IServices.ILogin.IProvider.IFacebook;
using System;

namespace Corretaje.Service.Services.Login.Provider.Facebook
{
    public class FacebookUrl : IFacebookUrl
    {
        private readonly IFacebookConfiguracion _facebookConfiguracion;

        public FacebookUrl(IFacebookConfiguracion facebookConfiguracion)
        {
            _facebookConfiguracion = facebookConfiguracion;
        }

        public Uri GetValidacionTokenUsuarioUrl(string usuarioToken)
        {
            return new Uri(string.Format(_facebookConfiguracion.UrlValidacionTokenUsuario, usuarioToken));
        }
    }
}
