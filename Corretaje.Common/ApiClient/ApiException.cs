using System;

namespace Corretaje.Common.ApiClient
{
    public class ApiException : Exception
    {
        public int StatusCode { get; set; }

        public string Content { get; set; }
    }
}
