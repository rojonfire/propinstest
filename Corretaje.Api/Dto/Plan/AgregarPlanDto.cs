using Corretaje.Api.Dto.ServicioBase;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Corretaje.Api.Dto.Plan
{
    public class AgregarPlanDto
    {
        [Required(ErrorMessage = "Debe indicar el Precio")]
        public decimal Precio { get; set; }

        public List<ServicioBaseDto> ServiciosBase { get; set; }

        public List<ServicioAdicionalDto> ServiciosAdicionales { get; set; }

        public string Descripcion { get; set; }

        public bool Descuento { get; set; }

        public string TextoDescuento { get; set; }

        [Required(ErrorMessage = "Debe indicar el Nombre")]
        public string Nombre { get; set; }

        public bool Fast { get; set; }

        public bool EsVenta { get; set; }
    }
}
