using Corretaje.Service.IServices.IBloqueService.IBloqueFotografo;
using MongoDB.Driver;

namespace Corretaje.Service.Services.BloqueService.BloqueFotografo
{
    public class BloqueFotografoQueryFiltro : IBloqueFotografoQueryFiltro
    {
        public FilterDefinition<Domain.Agenda.BloqueFotografo> FindByFotografoId(string id)
        {
            return Builders<Domain.Agenda.BloqueFotografo>.Filter.Where(bloqueFotografo => bloqueFotografo.FotografoId == id);
        }
    }
}
