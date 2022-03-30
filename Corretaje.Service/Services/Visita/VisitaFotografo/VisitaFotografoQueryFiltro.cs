using Corretaje.Service.IServices.IVisita.IVisitaFotografo;
using Corretaje.Service.Services.Visita.VisitaBase;
using MongoDB.Driver;

namespace Corretaje.Service.Services.Visita.VisitaFotografo
{
    public class VisitaFotografoQueryFiltro : VisitaQueryFiltro<Domain.Agenda.VisitaFotografo>, IVisitaFotografoQueryFiltro
    {
        public FilterDefinition<Domain.Agenda.VisitaFotografo> FindByFotografoId(string id)
        {
            return Builders<Domain.Agenda.VisitaFotografo>.Filter.Where(visitaFotografo => visitaFotografo.FotografoId == id);
        }
    }
}
