using System;

namespace Corretaje.Service.IServices.ILogin.IProvider.IFacebook
{
    public interface IFacebookUrl
    {
        Uri GetValidacionTokenUsuarioUrl(string token);
    }
}
