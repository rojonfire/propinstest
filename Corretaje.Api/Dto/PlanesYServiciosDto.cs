using Corretaje.Api.Dto.Plan;
using Corretaje.Api.Dto.ServicioBase;
using System.Collections.Generic;

namespace Corretaje.Api.Dto
{
    public class PlanesYServiciosDto
    {
        public IEnumerable<PlanSinServiciosBaseDto> Planes { get; set; }

        public IEnumerable<ServicioBaseFormateadoParaVistaDto> Servicios { get; set; }
    }
}
