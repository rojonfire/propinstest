using System;

namespace Corretaje.Service.IServices.ILogin.IProvider.IGoogle
{
    public interface IGoogleUrl
    {
        Uri GetValidacionTokenUsuarioUrl(string token);
    }
}
