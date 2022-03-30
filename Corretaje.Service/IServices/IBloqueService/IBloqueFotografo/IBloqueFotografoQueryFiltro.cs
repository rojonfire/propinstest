using Corretaje.Domain.Agenda;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IBloqueService.IBloqueFotografo
{
    public interface IBloqueFotografoQueryFiltro
    {
        FilterDefinition<BloqueFotografo> FindByFotografoId(string id);
    }
}
