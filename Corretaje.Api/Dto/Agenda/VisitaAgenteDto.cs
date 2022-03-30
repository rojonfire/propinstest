namespace Corretaje.Api.Dto.Agenda
{
    public class VisitaAgenteDto : VisitaAgenteAgregarDto
    {
        public string Apellidos { get; set; }

        public string Email { get; set; }

        /// <summary>
        /// Corresponde al Id de la visita. (no confundir con el id del bloque)
        /// </summary>
        public string Id { get; set; }

        public string Telefono { get; set; }

        public string Nombre { get; set; }

        public string NombreProyecto { get; set; }

        public string UrlLive { get; set; }

        public string UrlBackoffice { get; set; }

        public string InmobiliariaId { get; set; }

        public string UrlLogoInmobiliaria { get; set; }
    }
}