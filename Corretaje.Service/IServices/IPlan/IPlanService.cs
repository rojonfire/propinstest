using Corretaje.Domain;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IPlan
{
    public interface IPlanService
    {
        Task<IEnumerable<Plan>> GetTodosLosPlanes();

        Task<Plan> AgregarListadoDeServiciosBase(ObjectId planId, IEnumerable<ServicioBase> serviciosBase);

        Task<Plan> AgregarListadoDeServiciosBase(Plan plan, IEnumerable<ServicioBase> serviciosBase);

        Task<Plan> AgregarListadoDeServiciosAdicionales(ObjectId planId, IEnumerable<ServicioAdicional> serviciosAdicionales);

        Task<ResultadoDelProceso> AgregarPlan(Plan plan);

        Task<ResultadoDelProceso> EliminarPlan(ObjectId planId);

        Task<Plan> AgregarServicioBase(ObjectId planId, ServicioBase servicioBase);

        Task<Plan> AgregarServicioBase(Plan plan, ServicioBase servicioBase);

        Task<Plan> EliminarListadoDeServiciosBase(ObjectId planId, IEnumerable<ObjectId> serviciosBaseIds);

        Task<Plan> EliminarListadoDeServiciosBase(Plan plan, IEnumerable<ServicioBase> serviciosBase);

        Task<Plan> EliminarServicioBase(ObjectId planId, ObjectId servicioBaseId);

        Task<Plan> EliminarServicioBase(Plan plan, ServicioBase servicioBase);

        Task<Plan> GetPlanById(ObjectId planId);

        Task<Plan> UpdatePlan(Plan plan);        
    }
}
