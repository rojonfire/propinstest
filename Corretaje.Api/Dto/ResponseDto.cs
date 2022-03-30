using Corretaje.Domain;

namespace Corretaje.Api.Dto
{
    public class ResponseDto
    {
        public string Mensaje { get; set; }

        public Estados.Respuesta Estado { get; set; }

        public dynamic Data { get; set; }

        public int Count { get; set; }
    }
}
