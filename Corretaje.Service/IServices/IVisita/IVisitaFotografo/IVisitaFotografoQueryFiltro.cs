using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IVisita.IVisitaBase;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IVisita.IVisitaFotografo
{
    public interface IVisitaFotografoQueryFiltro : IVisitaQueryFiltro<VisitaFotografo>
    {
        FilterDefinition<VisitaFotografo> FindByFotografoId(string id);
    }
}
