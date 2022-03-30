namespace Corretaje.Api.Dto.Tasacion.Request
{
    public class TasacionRequestDto
    {
        public int NumeroSolicitud { get; set; }
        public Bien Bien { get; set; }
        public Solicitante Solicitante { get; set; }
        public string IdUser { get; set; }
    }
}
