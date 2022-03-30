using Corretaje.Domain;

namespace Corretaje.Service.IServices
{
    public interface IRespuestaDelServicio
    {
        ResultadoDelProceso RetornarValidacion(dynamic datos, string mensaje);

        ResultadoDelProceso RetornarOk(dynamic datos, string mensaje);
    }
}
