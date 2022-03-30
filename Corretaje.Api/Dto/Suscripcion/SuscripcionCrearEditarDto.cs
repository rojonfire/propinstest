using System.ComponentModel.DataAnnotations;

namespace Corretaje.Api.Dto.Suscripcion
{
    public class SuscripcionCrearEditarDto
    {
        [Required(ErrorMessage = "El nombre es requerido")]
        public string NombreUsuario { get; set; }

        [Required(ErrorMessage = "El email es requerido")]
        public string EmailUsuario { get; set; }

        [Required(ErrorMessage = "El teléfono es requerido")]
        public string Telefono { get; set; }

        public string IdUsuario { get; set; }

        public string IdCliente { get; set; }

        public string ComunaUno { get; set; }

        public string ComunaDos { get; set; }

        public string ComunaTres { get; set; }

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

        public string TipoPropiedad { get; set; }

        public bool EsVenta { get; set; }
    }
}