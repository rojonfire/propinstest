using Corretaje.Domain.Evaluar;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IEvaluar
{
    public interface IQueryFiltro
    {
        FilterDefinition<EvaluarProyectoInmobiliario> FiltroEvaluarProyectoByInmobiliariaId(ObjectId proyectoInmobiliarioId);
    }
}
