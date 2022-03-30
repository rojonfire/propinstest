using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IBloqueService.IBloqueBase;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IBloqueService.IBloqueFotografo
{
    public interface IBloqueFotografoService : IBloqueService<BloqueFotografo>
    {
        Task<IEnumerable<BloqueFotografo>> GetByFotografoId(string id);
    }
}
