using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Corretaje.Common.ApiClient
{
    public interface IApiClient
    {
        Task<T> GetAsync<T>(Uri requestUrl);

        Task<T> PostAsync<T>(Uri requestUrl, HttpContent content, string securityToken);
    }
}
