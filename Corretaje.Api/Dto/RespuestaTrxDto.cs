namespace Corretaje.Api.Dto
{
    public class RespuestaTrxDto
    {


        public string Token { get; set; }
        public string Url { get; set; }
        public string Mensaje { get; set; }

        public string PrecioTotal { get; set; }
        public string IdOrden { get; set; }

        public string TrueUrl { get; set; } 
    }
}
