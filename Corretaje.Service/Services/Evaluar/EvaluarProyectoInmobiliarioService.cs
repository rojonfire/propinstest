using Corretaje.Domain.Evaluar;
using Corretaje.Repository;
using Corretaje.Service.IServices.IEvaluar;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services
{
    public class EvaluarProyectoInmobiliarioService : IEvaluarProyectoService
    {
        private readonly IRepository<EvaluarProyectoInmobiliario> _evaluarProyectoRepository;

        public EvaluarProyectoInmobiliarioService(string connectionstring)
        {
            _evaluarProyectoRepository = new Repository<EvaluarProyectoInmobiliario>(connectionstring);
        }

        public async Task Evaluar(EvaluarProyectoInmobiliario evaluacion)
        {
            var filter = Builders<EvaluarProyectoInmobiliario>.Filter.Where(eva => eva.ProyectoInmobiliarioId == evaluacion.ProyectoInmobiliarioId && eva.EvaluadorId == evaluacion.EvaluadorId);
            var evaPrevia = (await _evaluarProyectoRepository.SearchFor(filter)).FirstOrDefault();
            if (evaPrevia != null)
            {
                await _evaluarProyectoRepository.Delete(evaPrevia.Id);
            }
            await _evaluarProyectoRepository.Insert(evaluacion);
        }

        public async Task<IEnumerable<EvaluarProyectoInmobiliario>> GetAllByProyectoId(ObjectId proyectoInmobiliarioId)
        {
            var filter = Builders<EvaluarProyectoInmobiliario>.Filter.Where(evaluacion => evaluacion.ProyectoInmobiliarioId == proyectoInmobiliarioId);
            return await _evaluarProyectoRepository.SearchFor(filter);
        }
    }
}
