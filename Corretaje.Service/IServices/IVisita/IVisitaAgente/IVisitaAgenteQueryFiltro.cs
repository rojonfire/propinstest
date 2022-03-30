using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IVisita.IVisitaBase;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IVisita.IVisitaAgente
{
    public interface IVisitaAgenteQueryFiltro : IVisitaQueryFiltro<VisitaAgente>
    {
        FilterDefinition<VisitaAgente> FindByAgenteIdAndProyectoId(string id, string proyectoId);
        FilterDefinition<VisitaAgente> FindByAgenteId(string id);
        FilterDefinition<VisitaAgente> FindByUsuarioIdAndProyectoId(string usuarioId, string proyectoId);
        FilterDefinition<VisitaAgente> FindByProyectoId( string proyectoId);
    }
}
