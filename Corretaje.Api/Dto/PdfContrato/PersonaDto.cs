namespace Corretaje.Api.Dto.PdfContrato
{
    public class PersonaDto
    {
        public DireccionDto Domicilio { get; set; }
        public string CedulaIdentidad { get; set; }
        public string CorreoElectronico { get; set; }
        public string EstadoCivil { get; set; }
        public string Nombre { get; set; }
        public string Nacionalidad { get; set; }
        public string ProfesionOficio { get; set; }
    }
}
