using Corretaje.Api.Dto.Tasacion;
using Corretaje.Api.Dto.Tasacion.Request;
using System.Net.Http;

namespace Corretaje.Api.Commons.Tasacion
{
    public interface ITasacionHelper
    {
        HttpContent GetRequestContent(TasacionRequestDto tasacion);

        bool EsValida(TasacionDto tasacion);
    }
}
