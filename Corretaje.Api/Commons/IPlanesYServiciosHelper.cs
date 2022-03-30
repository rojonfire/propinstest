using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Plan;
using Corretaje.Api.Dto.ServicioBase;
using System.Collections.Generic;

namespace Corretaje.Api.Commons
{
    public interface IPlanesYServiciosHelper
    {
        PlanesYServiciosDto DarFormatoPlanesYServicios(IEnumerable<ServicioBaseFormateadoParaVistaDto> serviciosBase, IEnumerable<PlanConServicioBaseFormateadoParaVistaDto> planes);
    }
}
