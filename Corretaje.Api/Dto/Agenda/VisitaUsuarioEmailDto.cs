namespace Corretaje.Api.Dto.Agenda
{
    public class VisitaUsuarioEmailDto : VisitaUsuarioDto
    {
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public string NombreUsuario { get; set; }
        public string HoraInicio { get; set; }
        public string NombreCliente { get; set; }
        public string RutCliente { get; set; }
        public string TelefonoCliente { get; set; }
        public string EmailCliente { get; set; }
    }
}
