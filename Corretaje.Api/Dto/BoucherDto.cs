using Corretaje.Api.Dto.Propiedad;
using Corretaje.Domain;

namespace Corretaje.Api.Dto
{
    public class BoucherDto
    {
        public string PlanNombre { get; set; }
        public string[] idPlanServicios { get; set; }

        public string idUser { get; set; }

        public string nombreUser { get; set; }

        public DireccionDto Direccion { get; set; }

        public Estados.TipoProyecto TipoPropiedad { get; set; }
    }
}
