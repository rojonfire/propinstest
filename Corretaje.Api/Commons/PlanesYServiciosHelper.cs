using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Plan;
using Corretaje.Api.Dto.ServicioBase;
using Corretaje.Domain;
using System.Collections.Generic;
using System.Linq;

namespace Corretaje.Api.Commons
{
    public class PlanesYServiciosHelper : IPlanesYServiciosHelper
    {
        public PlanesYServiciosDto DarFormatoPlanesYServicios(IEnumerable<ServicioBaseFormateadoParaVistaDto> serviciosBase, IEnumerable<PlanConServicioBaseFormateadoParaVistaDto> planes)
        {
            foreach (var plan in planes)
            {
                foreach (var servicio in serviciosBase)
                {
                    if (plan.ServiciosBase.Any(servicioEnPlan => servicioEnPlan.Id == servicio.Id))
                    {
                        if (plan.TipoDePlan == Estados.TipoDePlan.Arriendo)
                        {
                            servicio.rent = true;
                        }
                        else if (plan.TipoDePlan == Estados.TipoDePlan.Venta)
                        {
                            servicio.sale = true;
                        }
                    }
                }
            }

            var planesSinServiciosBase = MapPlanSinServicioBase(planes);

            return new PlanesYServiciosDto()
            {
                Planes = planesSinServiciosBase,
                Servicios = serviciosBase
            };
        }

        private IEnumerable<PlanSinServiciosBaseDto> MapPlanSinServicioBase(IEnumerable<PlanConServicioBaseFormateadoParaVistaDto> planes)
        {
            var planSinServiciosBase = new List<PlanSinServiciosBaseDto>();

            foreach (var plan in planes)
            {
                planSinServiciosBase.Add(new PlanSinServiciosBaseDto
                {
                    Id = plan.Id,
                    Nombre = plan.Nombre,
                    Precio = plan.Precio,
                    PrecioString = plan.PrecioString,
                    Descuento = plan.Descuento,
                    TextoDescuento = plan.TextoDescuento

                });
            }

            return planSinServiciosBase;
        }
    }
}
