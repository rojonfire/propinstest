namespace Corretaje.Domain
{
    public class SuscripcionExportar
    {
        public string Nombre { get; set; }

        public string Email { get; set; }

        public string Telefono { get; set; }

        public string Tipo { get; set; }

        public string ComunaUno { get; set; }

        public string ComunaDos { get; set; }

        public string ComunaTres { get; set; }

        public string TipoPropiedad { get; set; }

        public int CantidadDormitoriosDesde { get; set; }

        public int CantidadDormitoriosHasta { get; set; }

        public int CantidadBanosDesde { get; set; }

        public int CantidadBanosHasta { get; set; }

        public int CantidadEstacionamientos { get; set; }

        public double ValorDesde { get; set; }

        public double ValorHasta { get; set; }

        public double MetrosTotalesDesde { get; set; }

        public double MetrosTotalesHasta { get; set; }

        public double MetrosUtilesDesde { get; set; }

        public double MetrosUtilesHasta { get; set; }

        public double Puntaje { get; set; }

        public string RecomendacionesUno { get; set; }

        public string RecomendacionesDos { get; set; }

        public string RecomendacionesTres { get; set; }
    }
}
