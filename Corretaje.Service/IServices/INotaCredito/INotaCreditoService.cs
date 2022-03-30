using Corretaje.Domain;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.INotaCredito
{
    public interface INotaCreditoService
    {
        Task<NotaCredito> GenerarNotaCredito(decimal monto, string ordenCompraId);
    }
}
