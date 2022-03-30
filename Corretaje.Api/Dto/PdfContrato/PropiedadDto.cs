namespace Corretaje.Api.Dto.PdfContrato
{
    public class PropiedadDto
    {
        public DireccionDto Direccion { get; set; }

        public int CantidadDeBodegas { get; set; }

        public int CantidadDeEstacionamientos { get; set; }

        public int PropiedadAñoRegistro { get; set; }

        public string ForjasNombre { get; set; }

        public string ForjasNumero { get; set; }

        public string Rol { get; set; }
    }
}
