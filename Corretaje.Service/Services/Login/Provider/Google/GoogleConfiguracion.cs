using Corretaje.Service.IServices.ILogin.IProvider.IGoogle;

namespace Corretaje.Service.Services.Login.Provider.Google
{
    public class GoogleConfiguracion : IGoogleConfiguracion
    {
        public string UrlValidacionTokenUsuario { get; set; }
    }
}
