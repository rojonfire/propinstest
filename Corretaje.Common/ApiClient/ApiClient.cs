using Newtonsoft.Json;
using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Corretaje.Common.ApiClient
{
    public class ApiClient : IApiClient
    {
        public async Task<T> GetAsync<T>(Uri requestUrl)
        {
            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage(HttpMethod.Get, requestUrl))
            using (var response = await client.SendAsync(request))
            {
                var stream = await response.Content.ReadAsStreamAsync();

                if (response.IsSuccessStatusCode)
                {
                    return DeserializeJsonFromStream<T>(stream);
                }

                var content = await StreamToStringAsync(stream);

                throw new ApiException
                {
                    StatusCode = (int)response.StatusCode,
                    Content = content
                };
            }
        }

        public async Task<T> PostAsync<T>(Uri requestUrl, HttpContent content, string securityToken)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", securityToken);

                using (var request = new HttpRequestMessage(HttpMethod.Post, requestUrl))
                using (var response = await client.PostAsync(requestUrl, content))
                {
                    var stream = await response.Content.ReadAsStreamAsync();

                    if (response.IsSuccessStatusCode)
                    {
                        return DeserializeJsonFromStream<T>(stream);
                    }

                    var exceptionContent = await StreamToStringAsync(stream);

                    throw new ApiException
                    {
                        StatusCode = (int)response.StatusCode,
                        Content = exceptionContent
                    };
                }
            }
        }

        private static T DeserializeJsonFromStream<T>(Stream stream)
        {
            if (stream == null || stream.CanRead == false)
                return default;

            using (var sr = new StreamReader(stream))
            using (var jtr = new JsonTextReader(sr))
            {
                var js = new JsonSerializer();

                return js.Deserialize<T>(jtr);
            }
        }

        private static async Task<string> StreamToStringAsync(Stream stream)
        {
            string content = null;

            if (stream != null)
                using (var sr = new StreamReader(stream))
                    content = await sr.ReadToEndAsync();

            return content;
        }
    }
}
