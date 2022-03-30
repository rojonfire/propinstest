namespace Corretaje.Api.Dto.PdfContrato
{
    public class CuentaCorrienteDto
    {
        // esto se debe agregar al cliente
        public string Numero { get; set; }
        public string BancoNombre { get; set; }
        public string TitularNombre { get; set; }
        public string TitularCedulaIdentidad { get; set; }
        public string TitularCorreoElectronico { get; set; }
    }
}
