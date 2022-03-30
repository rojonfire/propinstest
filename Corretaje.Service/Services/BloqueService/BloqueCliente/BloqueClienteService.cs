using System.Collections.Generic;
using System.Threading.Tasks;
using Corretaje.Repository;
using Corretaje.Service.IServices.IBloqueService.IBloqueCliente;

namespace Corretaje.Service.Services.BloqueService
{
    public class BloqueClienteService : BloqueBase.BloqueService<Domain.Agenda.BloqueCliente>, IBloqueClienteService
    {
        private readonly IBloqueClienteQueryFiltro _bloqueClienteQueryFiltro;

        public BloqueClienteService(
            IBloqueClienteQueryFiltro bloqueClienteQueryFiltro,
            IRepository<Domain.Agenda.BloqueCliente> repositoryBloqueCliente) : base(repositoryBloqueCliente)
        {
            _bloqueClienteQueryFiltro = bloqueClienteQueryFiltro;
        }

        public async Task<IEnumerable<Domain.Agenda.BloqueCliente>> GetByClienteId(string id)
        {
            return await _repository.SearchFor(_bloqueClienteQueryFiltro.FindByClienteId(id));
        }

        public async Task<IEnumerable<Domain.Agenda.BloqueCliente>> GetByPropiedadId(string id)
        {
            return await _repository.SearchFor(_bloqueClienteQueryFiltro.FindByPropiedadId(id));
        }
    }
}
