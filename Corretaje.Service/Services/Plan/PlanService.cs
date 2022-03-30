using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IPlan;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Plan
{
    public class PlanService : IPlanService
    {
        private readonly IPlanConfiguration _planConfiguracion;
        private readonly IRepository<Domain.Plan> _planRepository;
        private readonly IRespuestaDelServicio _respuestaDelServicio;

        public PlanService(IPlanConfiguration planConfiguracion, IRepository<Domain.Plan> planRepository,
            IRespuestaDelServicio respuestaDelServicio)
        {
            _planConfiguracion = planConfiguracion;
            _planRepository = planRepository;
            _respuestaDelServicio = respuestaDelServicio;
        }

        private async Task<bool> PuedeAgregarPlan()
        {
            var planes = (ICollection<Domain.Plan>) await GetTodosLosPlanes();

            return !AlcanzoLimiteDePlanes(planes);
        }

        private bool AlcanzoLimiteDePlanes(ICollection<Domain.Plan> planes)
        {
            return planes.Count >= _planConfiguracion.CantidadDePlanes;
        }

        private bool ExistePlan(Corretaje.Domain.Plan plan)
        {
            return plan != null;
        }

        private IEnumerable<ServicioBase> EncontrarColeccionDeServiciosBaseEnPlan(Corretaje.Domain.Plan plan,
            IEnumerable<ObjectId> serviciosBaseIds)
        {
            var coleccionDeServiciosBaseEnPlan = new List<ServicioBase>();

            foreach (var id in serviciosBaseIds)
            {
                var servicioBase = EncontrarServicioBaseEnPlan(plan, id);

                if (servicioBase == null)
                {
                    continue;
                }

                coleccionDeServiciosBaseEnPlan.Add(servicioBase);
            }

            return coleccionDeServiciosBaseEnPlan;
        }

        private ServicioBase EncontrarServicioBaseEnPlan(Domain.Plan plan, ObjectId servicioBaseId)
        {
            return plan.ServiciosBase.SingleOrDefault(servicioBase => servicioBase.Id == servicioBaseId);
        }

        private void DeleteServicioBase(Domain.Plan plan, ServicioBase servicioBase)
        {
            plan.ServiciosBase.Remove(servicioBase);
        }

        private void SetServicioBase(Domain.Plan plan, ServicioBase servicioBase)
        {
            plan.ServiciosBase.Add(servicioBase);
        }

        private void SetServicioAdicional(Domain.Plan plan, ServicioAdicional servicioAdicional)
        {
            plan.ServiciosAdicionales.Add(servicioAdicional);
        }

        public async Task<IEnumerable<Domain.Plan>> GetTodosLosPlanes()
        {
            return await _planRepository.GetAll();
        }

        public async Task<Domain.Plan> AgregarServicioBase(ObjectId planId, ServicioBase servicioBase)
        {
            var plan = await GetPlanById(planId);

            return await AgregarServicioBase(plan, servicioBase);
        }

        public async Task<Domain.Plan> AgregarServicioBase(Domain.Plan plan, ServicioBase servicioBase)
        {
            SetServicioBase(plan, servicioBase);

            return await UpdatePlan(plan);
        }

        public async Task<ResultadoDelProceso> AgregarPlan(Domain.Plan plan)
        {
            if (!await PuedeAgregarPlan())
            {
                return _respuestaDelServicio.RetornarValidacion(null, "Maxima cantidad de planes alcanzado");
            }

            var planAgregado = await _planRepository.Insert(plan);

            return _respuestaDelServicio.RetornarOk(planAgregado, null);
        }

        public async Task<Domain.Plan> AgregarListadoDeServiciosBase(ObjectId planId,
            IEnumerable<ServicioBase> serviciosBase)
        {
            var plan = await GetPlanById(planId);

            return await AgregarListadoDeServiciosBase(plan, serviciosBase);
        }

        public async Task<Domain.Plan> AgregarListadoDeServiciosBase(Domain.Plan plan,
            IEnumerable<ServicioBase> serviciosBase)
        {
            foreach (var servicio in serviciosBase)
            {
                SetServicioBase(plan, servicio);
            }

            return await UpdatePlan(plan);
        }

        public async Task<Domain.Plan> AgregarListadoDeServiciosAdicionales(ObjectId planId, IEnumerable<ServicioAdicional> serviciosAdicionales)
        {
            var plan = await GetPlanById(planId);

            return await AgregarListadoDeServiciosAdicionales(plan, serviciosAdicionales);
        }

        public async Task<Domain.Plan> AgregarListadoDeServiciosAdicionales(Domain.Plan plan, IEnumerable<ServicioAdicional> serviciosAdicionales)
        {
            foreach (var servicio in serviciosAdicionales)
            {
                SetServicioAdicional(plan, servicio);
            }

            return await UpdatePlan(plan);
        }

        public async Task<Domain.Plan> EliminarServicioBase(ObjectId planId, ObjectId servicioBaseId)
        {
            var plan = await GetPlanById(planId);

            var servicioBaseParaEliminar = EncontrarServicioBaseEnPlan(plan, servicioBaseId);

            return await EliminarServicioBase(plan, servicioBaseParaEliminar);
        }

        public async Task<Domain.Plan> EliminarServicioBase(Domain.Plan plan, ServicioBase servicioBase)
        {
            DeleteServicioBase(plan, servicioBase);

            return await UpdatePlan(plan);
        }

        public async Task<Domain.Plan> GetPlanById(ObjectId planId)
        {
            return await _planRepository.Get(planId);
        }

        public async Task<Domain.Plan> EliminarListadoDeServiciosBase(ObjectId planId,
            IEnumerable<ObjectId> serviciosBaseIds)
        {
            var plan = await GetPlanById(planId);

            var serviciosBase = EncontrarColeccionDeServiciosBaseEnPlan(plan, serviciosBaseIds);

            return await EliminarListadoDeServiciosBase(plan, serviciosBase);
        }

        public async Task<Domain.Plan> EliminarListadoDeServiciosBase(Domain.Plan plan,
            IEnumerable<ServicioBase> serviciosBase)
        {
            foreach (var servicioBase in serviciosBase)
            {
                DeleteServicioBase(plan, servicioBase);
            }

            return await UpdatePlan(plan);
        }

        public async Task<Domain.Plan> UpdatePlan(ObjectId planId)
        {
            var plan = await GetPlanById(planId);

            return await UpdatePlan(plan);
        }

        public async Task<Domain.Plan> UpdatePlan(Domain.Plan plan)
        {
            return await _planRepository.Update(plan);
        }

        public async Task<ResultadoDelProceso> EliminarPlan(ObjectId planId)
        {
            await _planRepository.Delete(planId);

            return _respuestaDelServicio.RetornarOk(null, "Plan eliminado");
        }
    }
}