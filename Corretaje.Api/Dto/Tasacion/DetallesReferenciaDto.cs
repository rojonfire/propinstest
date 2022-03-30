namespace Corretaje.Api.Dto.Tasacion
{
    public class DetallesReferenciaDto
    {
        public DetallesReferenciaDto()
        {
            Direccion = new DireccionDto();
        }

        public DireccionDto Direccion { get; set; }

        public int Superficie { get; set; }

        public int ValoracionUF { get; set; }

        public string FechaPublicacion { get; set; }
    }
}
