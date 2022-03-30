using Corretaje.Common.ApiClient;
using Corretaje.Service.IServices.ILogin.IProvider.IFacebook;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Login.Provider.Facebook
{
    public class FacebookToken : IFacebookToken
    {
        private readonly IApiClient _apiClient;
        private readonly IFacebookUrl _facebookUrl;

        public FacebookToken(IApiClient apiClient, IFacebookUrl facebookUrl)
        {
            _apiClient = apiClient;
            _facebookUrl = facebookUrl;
        }

        public async Task<bool> TokenUsuarioEsValido(string token)
        {
            var url = _facebookUrl.GetValidacionTokenUsuarioUrl(token);

            try
            {
                var result = await _apiClient.GetAsync<FacebookUsuario>(url);
                return result != null;
            }
            catch (System.Exception)
            {
                return false;
            }
        }
    }
}
