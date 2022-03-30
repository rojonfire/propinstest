using Corretaje.Service.IServices.IBloqueService.IBloqueCliente;
using MongoDB.Driver;

namespace Corretaje.Service.Services.BloqueService.BloqueCliente
{
    public class BloqueClienteQueryFiltro : IBloqueClienteQueryFiltro
    {
        public FilterDefinition<Domain.Agenda.BloqueCliente> FindByClienteId(string id)
        {
            return Builders<Domain.Agenda.BloqueCliente>.Filter.Where(bloqueCliente => bloqueCliente.ClienteId == id);
        }

        public FilterDefinition<Domain.Agenda.BloqueCliente> FindByPropiedadId(string id)
        {
            return Builders<Domain.Agenda.BloqueCliente>.Filter.Where(bloqueCliente => bloqueCliente.PropiedadId == id);
        }
    }
}
