using Corretaje.Api.Dto.ServicioBase;
using System.Collections.Generic;

namespace Corretaje.Api.Dto.Plan
{
    public class PlanDto
    {
        public decimal Precio { get; set; }

        public string PrecioString { get; set; }

        public List<ServicioBaseDto> ServiciosBase { get; set; }

        public List<ServicioAdicionalDto> ServiciosAdicionales { get; set; }

        public string Id { get; set; }

        public string Nombre { get; set; }

        public bool Descuento { get; set; }

        public string TextoDescuento { get; set; }

        public bool Fast { get; set; }        

        public bool EsVenta { get; set; }

        public PlanDto()
        {
            ServiciosBase = new List<ServicioBaseDto>();
            ServiciosAdicionales = new List<ServicioAdicionalDto>();
        }
    }
}
