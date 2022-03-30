using Corretaje.Domain.Agenda;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IBloqueService.IBloqueCliente
{
    public interface IBloqueClienteQueryFiltro
    {
        FilterDefinition<BloqueCliente> FindByClienteId(string id);

        FilterDefinition<BloqueCliente> FindByPropiedadId(string id);
    }
}
