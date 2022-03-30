using System.Collections.Generic;
using System.Threading.Tasks;
using Corretaje.Domain;
using Corretaje.Repository;

namespace Corretaje.Service.IServices
{
    public interface IOperacionService : IRepository<Operacion>
    {
        Task<List<Operacion>> BusquedaOperacion(Operacion operacionDto);
    }
}
