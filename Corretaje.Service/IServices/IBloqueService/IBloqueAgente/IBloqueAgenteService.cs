using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IBloqueService.IBloqueBase;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IBloqueService.IBloqueAgente
{
    public interface IBloqueAgenteService : IBloqueService<BloqueAgente>
    {
        Task<IEnumerable<BloqueAgente>> GetByAgenteIdAndProyectoId(string id, string proyectoId);
        Task<IEnumerable<Domain.Agenda.BloqueAgente>> GetByProyectoId(string proyectoId);
    }
}
