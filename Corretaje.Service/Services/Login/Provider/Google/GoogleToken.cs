using Corretaje.Common.ApiClient;
using Corretaje.Service.IServices.ILogin.IProvider.IGoogle;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Login.Provider.Google
{
    public class GoogleToken : IGoogleToken
    {
        private readonly IApiClient _apiClient;
        private readonly IGoogleUrl _googleUrl;

        public GoogleToken(IApiClient apiClient, IGoogleUrl googleUrl)
        {
            _apiClient = apiClient;
            _googleUrl = googleUrl;
        }

        public async Task<bool> TokenUsuarioEsValido(string token)
        {
            var url = _googleUrl.GetValidacionTokenUsuarioUrl(token);

            try
            {
                var result = await _apiClient.GetAsync<GoogleUsuario>(url);
                return result != null;
            }
            catch (System.Exception e)
            {
                return false;
            }
        }
    }
}
