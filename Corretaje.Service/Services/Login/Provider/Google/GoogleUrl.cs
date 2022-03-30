using Corretaje.Service.IServices.ILogin.IProvider.IGoogle;
using System;

namespace Corretaje.Service.Services.Login.Provider.Google
{
    public class GoogleUrl : IGoogleUrl
    {
        private readonly IGoogleConfiguracion _googleConfiguracion;

        public GoogleUrl(IGoogleConfiguracion googleConfiguracion)
        {
            _googleConfiguracion = googleConfiguracion;
        }

        public Uri GetValidacionTokenUsuarioUrl(string usuarioToken)
        {
            return new Uri(string.Format(_googleConfiguracion.UrlValidacionTokenUsuario, usuarioToken));
        }
    }
}
