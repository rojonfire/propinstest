using System.Collections.Generic;
using System.Threading.Tasks;
using Corretaje.Repository;
using Corretaje.Service.IServices.IBloqueService.IBloqueFotografo;

namespace Corretaje.Service.Services.BloqueService
{
    public class BloqueFotografoService : BloqueBase.BloqueService<Domain.Agenda.BloqueFotografo>, IBloqueFotografoService
    {
        private readonly IBloqueFotografoQueryFiltro _bloqueFotografoQueryFiltro;

        public BloqueFotografoService(
            IBloqueFotografoQueryFiltro bloqueFotografoQueryFiltro,
            IRepository<Domain.Agenda.BloqueFotografo> repositoryBloqueFotografo) : base(repositoryBloqueFotografo)
        {
            _bloqueFotografoQueryFiltro = bloqueFotografoQueryFiltro;
        }

        public async Task<IEnumerable<Domain.Agenda.BloqueFotografo>> GetByFotografoId(string id)
        {
            return await _repository.SearchFor(_bloqueFotografoQueryFiltro.FindByFotografoId(id));
        }
    }
}
