using System.Collections.Generic;
using System.Threading.Tasks;

using Corretaje.Domain;

namespace Corretaje.Service.IServices.IServicio
{
    public interface ICrearBoucher
    {
        Task<Plan> GetPlan(string idPlan);

        Task<List<ServicioAdicional>> GetServicioAdicional(string[] idServicioAdicional);
    }
}
