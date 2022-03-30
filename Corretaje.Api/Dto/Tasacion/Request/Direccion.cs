namespace Corretaje.Api.Dto.Tasacion.Request
{
    public class Direccion
    {
        public string Calle { get; set; }
        public int Numero { get; set; }
        public int NumeroDepartamento { get; set; }
        public string Comuna { get; set; }
        public string Ciudad { get; set; }
        public string Region { get; set; }
    }
}
