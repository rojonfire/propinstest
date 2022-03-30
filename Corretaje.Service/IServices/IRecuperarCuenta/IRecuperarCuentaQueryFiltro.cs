using MongoDB.Driver;
using Corretaje.Domain;

namespace Corretaje.Service.IServices.IRecuperarCuenta
{
    public interface IRecuperarCuentaQueryFiltro
    {
        FilterDefinition<RecuperarCuenta> GetByGuid(string link);
    }
}
