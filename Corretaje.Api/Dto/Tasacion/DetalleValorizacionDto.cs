namespace Corretaje.Api.Dto.Tasacion
{
    public class DetalleValorizacionDto
    {
        public int anno { get; set; }
        public int CoeficienteValoracion { get; set; }
        public int LiquidacionPesos { get; set; }
        public int Superficie { get; set; }
        public int Valorizacion { get; set; }
        public int ValorM2 { get; set; }
        public string Tipo { get; set; }
        public string Calidad { get; set; }
        public string Rol { get; set; }
    }
}
