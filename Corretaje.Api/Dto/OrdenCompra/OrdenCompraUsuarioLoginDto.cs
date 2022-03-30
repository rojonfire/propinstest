using Corretaje.Api.Dto.Plan;
using Corretaje.Api.Dto.Propiedad;
using Corretaje.Domain;
using System.Collections.Generic;

namespace Corretaje.Api.Dto.OrdenCompra
{
    public class OrdenCompraUsuarioLoginDto
    {
        public OrdenCompraUsuarioLoginDto()
        {
            ServiciosAdicionales = new List<ServicioAdicionalDto>();
        }

        public Estados.Transaccion Estado { get; set; }

        public List<ServicioAdicionalDto> ServiciosAdicionales { get; set; }

        public PlanDto Plan { get; set; }

        public DireccionDto Direccion { get; set; }

        public string Id { get; set; }
    }
}
