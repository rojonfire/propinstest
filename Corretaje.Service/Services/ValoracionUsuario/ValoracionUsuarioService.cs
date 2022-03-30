using Corretaje.Repository;
using Corretaje.Service.IServices.IValoracionUsuario;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.ValoracionUsuario
{
    public class ValoracionUsuarioService : IValoracionUsuarioService
    {
        private readonly IRepository<Domain.ValoracionUsuario> _repositoryValoracionUsuario;
        private readonly IValoracionUsuarioQueryFiltro _valoracionUsuarioQueryFiltro;

        public ValoracionUsuarioService(IValoracionUsuarioQueryFiltro valoracionUsuarioQueryFiltro, IRepository<Domain.ValoracionUsuario> repositoryValoracionUsuario)
        {
            _repositoryValoracionUsuario = repositoryValoracionUsuario;
            _valoracionUsuarioQueryFiltro = valoracionUsuarioQueryFiltro;
        }

        public async Task<Domain.ValoracionUsuario> AddValoracionUsuario(Domain.ValoracionUsuario valoracionUsuario)
        {
            return await _repositoryValoracionUsuario.Insert(valoracionUsuario);
        }

        public async Task<IEnumerable<Domain.ValoracionUsuario>> GetCasosDeExito()
        {
            return await _repositoryValoracionUsuario.SearchFor(_valoracionUsuarioQueryFiltro.FiltroCasosDeExito());
        }
    }
}
