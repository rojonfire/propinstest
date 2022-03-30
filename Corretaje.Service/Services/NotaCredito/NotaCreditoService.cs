using Corretaje.Repository;
using Corretaje.Service.IServices.INotaCredito;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.NotaCredito
{
    public class NotaCreditoService : INotaCreditoService
    {
        private readonly IRepository<Domain.NotaCredito> _repositoryNotaCredito;

        public NotaCreditoService(IRepository<Domain.NotaCredito> repositoryNotaCredito)
        {
            _repositoryNotaCredito = repositoryNotaCredito;
        }

        public async Task<Domain.NotaCredito> GenerarNotaCredito(decimal monto, string ordenCompraId)
        {
            var notaCredito = new Domain.NotaCredito()
            {
                Monto = monto,
                OrdenCompraId = ordenCompraId
            };

            return await _repositoryNotaCredito.Insert(notaCredito);
        }
    }
}
