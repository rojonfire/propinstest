using Corretaje.Domain.Evaluar;
using Corretaje.Repository;
using Corretaje.Service.IServices.IEvaluar;
using MongoDB.Driver;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services
{
    public class EvaluarAnfitrionService : IEvaluarAnfitrionService
    {
        private readonly IRepository<EvaluarAnfitrion> _evaluarAnfitrionRepository;

        public EvaluarAnfitrionService(string connectionstring)
        {
            _evaluarAnfitrionRepository = new Repository<EvaluarAnfitrion>(connectionstring);
        }

        public async Task Evaluar(EvaluarAnfitrion evaluacion)
        {
            var filter = Builders<EvaluarAnfitrion>.Filter.Where(eva => eva.ProyectoInmobiliarioId == evaluacion.ProyectoInmobiliarioId && 
                                                                        eva.EvaluadorId == evaluacion.EvaluadorId && 
                                                                        eva.AgenteId == evaluacion.AgenteId);
            var evaPrevia = (await _evaluarAnfitrionRepository.SearchFor(filter)).FirstOrDefault();
            if (evaPrevia != null)
            {
                await _evaluarAnfitrionRepository.Delete(evaPrevia.Id);
            }
            await _evaluarAnfitrionRepository.Insert(evaluacion);
        }
    }
}
