using Corretaje.Domain.Evaluar;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IEvaluar
{
    public interface IEvaluarProyectoService
    {
        Task Evaluar(EvaluarProyectoInmobiliario evaluacion);
        Task<IEnumerable<EvaluarProyectoInmobiliario>> GetAllByProyectoId(ObjectId proyectoInmobiliarioId);
    }
}
