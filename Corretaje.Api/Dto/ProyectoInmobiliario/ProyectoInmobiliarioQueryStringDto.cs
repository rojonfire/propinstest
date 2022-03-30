using Corretaje.Domain;

namespace Corretaje.Api.Dto
{
    public class ProyectoInmobiliarioQueryStringDto
    {
        public string InmobiliariaId { get; set; }

        public Estados.ProyectoInmobiliario Estado { get; set; }

        public string TipoProyecto { get; set; }

        public int IdRegion { get; set; }

        public string Comuna { get; set; }

        public string Operacion { get; set; }

        public int Rentabilidad { get; set; }

        public int Conectividad { get; set; }

        public int Terminaciones { get; set; }

        public int Equipamiento { get; set; }
    }
}
