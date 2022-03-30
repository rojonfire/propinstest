using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Corretaje.Domain;
using Corretaje.Service.IServices.IPlan;
using Corretaje.Service.IServices.IServicio;
using MongoDB.Bson;

namespace Corretaje.Service.Services.Servicio
{
    public class CrearBoucher : ICrearBoucher
    {

        private readonly IPlanService _plan;
        private readonly IServicioService<ServicioAdicional> _servicioAdicionalService;

        public CrearBoucher(IPlanService plan, IServicioService<ServicioAdicional> servicioAdicionalService)
        {
            _plan = plan;
            _servicioAdicionalService = servicioAdicionalService;
        }

        public async Task<Domain.Plan> GetPlan(string plan)
        {
            var planes = await _plan.GetTodosLosPlanes();
            return planes.FirstOrDefault(p => p.Nombre == plan);
        }

        public async Task<List<ServicioAdicional>> GetServicioAdicional(string[] idServicioAdicional)
        {
            var adicionales = new List<ServicioAdicional>();
            var servicios = await _servicioAdicionalService.GetTodosLosServicios();
            if (!servicios.Any()) return adicionales;
            adicionales.AddRange(idServicioAdicional.Select(item => servicios.FirstOrDefault(s => s.Id == ObjectId.Parse(item))));
            return adicionales;
        }
    }
}
