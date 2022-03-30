using Corretaje.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Corretaje.Api.Dto.ContratacionPlan
{
    public class AgregarContratacionPlanDto
    {
        public string IdUsuario { get; set; }
        public DateTime FechaContratacion { get; set; }
        public Estados.TipoProyecto TipoProyecto { get; set; }
        public string Direccion { get; set; }

        public int Numero { get; set; }

        public int NumeroDepartamento { get; set; }

        public string Comuna { get; set; }

        public string Barrio { get; set; }

        [Required(ErrorMessage = "Debe indicar el id plan")]
        public string IdPlan { get; set; }
        public string NombrePlan { get; set; }

        public double Valor { get; set; }

        public Estados.TipoMoneda TipoMoneda { get; set; }

        public DateTime FechaVisitaFotografo { get; set; }

        public string FechaVisitaFotografoString { get; set; }

        public string IdFotografo { get; set; }

        public string HoraVisitaFotografo { get; set; }
        public decimal ValorTotalAdicionales { get; set; }

        public List<string> HorarioVisitas { get; set; }

        public IEnumerable<string> ServiciosAdicionales { get; set; }

        public List<Corretaje.Domain.ServicioAdicional> ServiciosAdicionalesDetail { get; set; }

        public CaracteristicasPropiedadDto CaracteristicasPropiedad { get; set; }

        public CaracteristicasComunidadDto CaracteristicasComunidad { get; set; }

        public CaracteristicasAdicionalesDto CaracteristicasAdicionales { get; set; }
    }

    public class CaracteristicasPropiedadDto
    {
        public int AnioConstruccion { get; set; }

        public string Orientacion { get; set; }

        public double MetrosUtiles { get; set; }

        public double MetrosTotales { get; set; }

        public int NumeroDormitorios { get; set; }

        public int NumeroBanios { get; set; }

        public bool DormitorioServicio { get; set; }

        public bool BanioServicio { get; set; }

        public bool Bodega { get; set; }

        public int Estacionamiento { get; set; }

        public string GastosComunes { get; set; }

        public string Contribuciones { get; set; }
    }

    public class CaracteristicasAdicionalesDto
    {
        public string TipoCalefaccion { get; set; }

        public bool Escritorio { get; set; }

        public bool Alarma { get; set; }

        public bool Logia { get; set; }

        public bool SalaDeEstar { get; set; }

        public bool CocinaAmoblada { get; set; }

        public bool PortonAutomatico { get; set; }
    }

    public class CaracteristicasComunidadDto
    {
        public bool AccesoControlado { get; set; }

        public bool AreasVerdes { get; set; }

        public bool SalaDeCine { get; set; }

        public bool SalaDeJuegos { get; set; }

        public bool Bicicletero { get; set; }

        public bool Ascensor { get; set; }

        public bool Sauna { get; set; }

        public bool JuegosInfantiles { get; set; }

        public bool PortonElectrico { get; set; }

        public bool Citofono { get; set; }

        public bool Quincho { get; set; }

        public bool Piscina { get; set; }

        public bool SalaDeEventos { get; set; }

        public bool EstacionamientoVisitas { get; set; }

        public bool CamaraSeguridad { get; set; }
    }
}
