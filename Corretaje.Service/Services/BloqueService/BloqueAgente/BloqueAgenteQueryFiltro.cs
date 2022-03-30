using Corretaje.Service.IServices.IBloqueService.IBloqueAgente;
using MongoDB.Driver;

namespace Corretaje.Service.Services.BloqueService.BloqueAgente
{
    public class BloqueAgenteQueryFiltro : IBloqueAgenteQueryFiltro
    {
        public FilterDefinition<Domain.Agenda.BloqueAgente> FindByAgenteIdAndProyectoId(string id, string proyectoId)
        {
            return Builders<Domain.Agenda.BloqueAgente>.Filter.Where(bloqueAgente => bloqueAgente.AgenteId == id && bloqueAgente.ProyectoId == proyectoId);
        }

        public FilterDefinition<Domain.Agenda.BloqueAgente> FindByProyectoId(string proyectoId)
        {
            return Builders<Domain.Agenda.BloqueAgente>.Filter.Where(bloqueAgente => bloqueAgente.ProyectoId == proyectoId);
        }
    }
}
