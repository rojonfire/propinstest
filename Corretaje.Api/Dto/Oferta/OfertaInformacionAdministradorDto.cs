namespace Corretaje.Api.Dto.Oferta
{
    public class OfertaInformacionAdministradorDto : OfertaDto
    {
        public string ReceptorEmail { get; set; }
        public string ReceptorNombre { get; set; }
        public string ReceptorRut { get; set; }
        public string DireccionCompleta { get; set; }
        public string DireccionReferencial { get; set; }
        public string PropiedadId { get; set; }
        public string EmisorEmail { get; set; }
    }
}
