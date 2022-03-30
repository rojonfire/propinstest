namespace Corretaje.Api.Dto.Agenda
{
    public class VisitaBrokerSuscriptorAgregarDto : VisitaAgregarDto
    {
        public string IdBroker { get; set; }

        public string IdSuscripcion { get; set; }

        public string PropiedadId { get; set; }

        public string PropiedadDireccion { get; set; }
    }
}