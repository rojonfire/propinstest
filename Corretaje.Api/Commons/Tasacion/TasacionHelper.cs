using Corretaje.Api.Dto.Tasacion;
using Corretaje.Api.Dto.Tasacion.Request;
using Newtonsoft.Json;
using System.Net.Http;

namespace Corretaje.Api.Commons.Tasacion
{
    public class TasacionHelper : ITasacionHelper
    {
        public bool EsValida(TasacionDto tasacion)
        {
            return tasacion.ReferenciaDeMercado.Informe != null;
        }

        public HttpContent GetRequestContent(TasacionRequestDto tasacion)
        {
            string tasacionJsonFormat = JsonConvert.SerializeObject(tasacion);

            return new TasacionContent(tasacionJsonFormat);
        }
    }
}
