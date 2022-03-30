namespace Corretaje.Api.Dto.Agenda
{
    public class VisitaAgenteAgregarDto : VisitaAgregarDto
    {
        public string AgenteId { get; set; }
        
        public string ProyectoId { get; set; }

        public string UsuarioId { get; set; }
    }
}