using Corretaje.Domain.Agenda;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IBloqueService.IBloqueAgente
{
    public interface IBloqueAgenteQueryFiltro
    {
        FilterDefinition<BloqueAgente> FindByAgenteIdAndProyectoId(string id, string proyectoId);
        FilterDefinition<BloqueAgente> FindByProyectoId(string proyectoId);
    }
}
