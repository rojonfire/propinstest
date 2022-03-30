using Corretaje.Domain;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IValoracionUsuario
{
    public interface IValoracionUsuarioQueryFiltro
    {
        FilterDefinition<ValoracionUsuario> FiltroCasosDeExito();
    }
}
