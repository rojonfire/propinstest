
namespace Corretaje.Domain
{
    public class ResultadoDelProceso
    {
        public dynamic Data { get; set; }

        public Estados.Respuesta Estado { get; set; }

        public string Mensaje { get; set; }
    }
}
