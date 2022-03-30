using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IBloqueService.IBloqueBase;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IBloqueService.IBloqueCliente
{
    public interface IBloqueClienteService : IBloqueService<BloqueCliente>
    {
        Task<IEnumerable<BloqueCliente>> GetByClienteId(string id);

        Task<IEnumerable<BloqueCliente>> GetByPropiedadId(string id);

    }
}
