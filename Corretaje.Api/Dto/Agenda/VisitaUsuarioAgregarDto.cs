using Corretaje.Api.Dto.Anfitrion;

namespace Corretaje.Api.Dto.Agenda
{
    public class VisitaUsuarioAgregarDto : VisitaAgregarDto
    {
        public AnfitrionDto Anfitrion { get; set; }

        public string Nombre { get; set; }

        public string PropiedadId { get; set; }

        public string Rut { get; set; }

        public string UsuarioId { get; set; }

        public string IdBroker { get; set; }

        public string IdSuscripcion { get; set; }

        public string PropiedadDireccion { get; set; }

        public string EmailPropietario { get; set; }

        public string EmailBroker { get; set; }

        public string EmailComprador { get; set; }
    }
}
