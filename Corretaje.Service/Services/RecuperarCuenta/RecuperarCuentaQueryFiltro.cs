using Corretaje.Service.IServices.IRecuperarCuenta;
using MongoDB.Driver;

namespace Corretaje.Service.Services.RecuperarCuenta
{
    public class RecuperarCuentaQueryFiltro : IRecuperarCuentaQueryFiltro
    {
        public FilterDefinition<Domain.RecuperarCuenta> GetByGuid(string guid)
        {
            return Builders<Domain.RecuperarCuenta>.Filter.Where(recuperarCuenta => recuperarCuenta.Guid == guid);
        }
    }
}
