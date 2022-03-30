
using Corretaje.Domain;

namespace Corretaje.Api.Dto.Plan
{
    public class PlanSinServiciosBaseDto
    {
        public decimal Precio { get; set; }

        public string PrecioString { get; set; }

        public Estados.TipoDePlan TipoDePlan { get; set; }

        public string Id { get; set; }

        public string Descripcion { get; set; }

        public bool Descuento { get; set; }

        public string TextoDescuento { get; set; }

        public string Nombre { get; set; }

        public bool EsVenta { get; set; }
    }
}
