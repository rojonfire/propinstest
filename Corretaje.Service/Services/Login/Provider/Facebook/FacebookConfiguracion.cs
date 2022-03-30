using Corretaje.Service.IServices.ILogin.IProvider.IFacebook;

namespace Corretaje.Service.Services.Login.Provider.Facebook
{
    public class FacebookConfiguracion : IFacebookConfiguracion
    {
        public string UrlValidacionTokenUsuario { get; set; }
    }
}
