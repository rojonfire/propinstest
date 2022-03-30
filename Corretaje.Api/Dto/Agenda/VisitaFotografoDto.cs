namespace Corretaje.Api.Dto.Agenda
{
    public class VisitaFotografoDto : VisitaFotografoAgregarDto
    {
        public string Apellidos { get; set; }

        public string Email { get; set; }

        /// <summary>
        /// Corresponde al Id de la visita. (no confundir con el id del bloque)
        /// </summary>
        public string Id { get; set; }

        public string Telefono { get; set; }

        public string Nombre { get; set; }
    }
}
