namespace Corretaje.Api.Dto.Tasacion
{
    public class TasacionPropiedadDto
    {
        public string Comuna { get; set; }

        public string Sector { get; set; }

        public string TipoVivienda { get; set; }

        public int NumeroDormitorios { get; set; }

        public int NumeroEstacionamientos { get; set; }

        public int MetrosUtiles { get; set; }

        public int MetrosTotales { get; set; }
    }
}
