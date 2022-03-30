using Corretaje.Repository;
using Corretaje.Service.IServices.IBloqueService.IBloqueAgente;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.BloqueService.BloqueAgente
{
    public class BloqueAgenteService : BloqueBase.BloqueService<Domain.Agenda.BloqueAgente>, IBloqueAgenteService
    {
        private readonly IBloqueAgenteQueryFiltro _bloqueAgenteQueryFiltro;

        public BloqueAgenteService(
            IBloqueAgenteQueryFiltro bloqueAgenteQueryFiltro,
            IRepository<Domain.Agenda.BloqueAgente> repositoryBloqueAgente) : base(repositoryBloqueAgente)
        {
            _bloqueAgenteQueryFiltro = bloqueAgenteQueryFiltro;
        }

        public async Task<IEnumerable<Domain.Agenda.BloqueAgente>> GetByAgenteIdAndProyectoId(string id, string proyectoId)
        {
            return await _repository.SearchFor(_bloqueAgenteQueryFiltro.FindByAgenteIdAndProyectoId(id, proyectoId));
        }

        public async Task<IEnumerable<Domain.Agenda.BloqueAgente>> GetByProyectoId( string proyectoId)
        {
            return (await _repository.SearchFor(_bloqueAgenteQueryFiltro.FindByProyectoId(proyectoId))).OrderBy(b => b.Tramo);
        }
    }
}