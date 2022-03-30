using Corretaje.Domain.Evaluar;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IEvaluar
{
    public interface IEvaluarAnfitrionService
    {
        Task Evaluar(EvaluarAnfitrion evaluacion);
    }
}
