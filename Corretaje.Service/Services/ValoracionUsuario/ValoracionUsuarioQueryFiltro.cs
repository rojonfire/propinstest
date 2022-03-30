using Corretaje.Service.IServices.IValoracionUsuario;
using MongoDB.Driver;

namespace Corretaje.Service.Services.ValoracionUsuario
{
    public class ValoracionUsuarioQueryFiltro : IValoracionUsuarioQueryFiltro
    {
        private const int _notaExito = 80;

        public FilterDefinition<Domain.ValoracionUsuario> FiltroCasosDeExito()
        {
            return Builders<Domain.ValoracionUsuario>.Filter.Where(validacion => validacion.Nota >= _notaExito);
        }
    }
}
