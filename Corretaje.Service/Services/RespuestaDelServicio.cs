using Corretaje.Domain;
using Corretaje.Service.IServices;

namespace Corretaje.Service.Services
{
    public class RespuestaDelServicio : IRespuestaDelServicio
    {
        public ResultadoDelProceso RetornarOk(dynamic datos, string mensaje)
        {
            return new ResultadoDelProceso()
            {
                Data = datos,
                Estado = Estados.Respuesta.Ok,
                Mensaje = mensaje
            };
        }

        public virtual ResultadoDelProceso RetornarValidacion(dynamic datos, string mensaje)
        {
            return new ResultadoDelProceso()
            {
                Data = datos,
                Estado = Estados.Respuesta.Error,
                Mensaje = mensaje
            };
        }
    }
}
