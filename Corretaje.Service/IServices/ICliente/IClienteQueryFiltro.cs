using MongoDB.Driver;

namespace Corretaje.Service.IServices.ICliente
{
    public interface IClienteQueryFiltro
    {
        FilterDefinition<Domain.Cliente> FindByRut(string rut);

        FilterDefinition<Domain.Cliente> FindByRutAndEmail(string rut, string email);

        FilterDefinition<Domain.Cliente> FindByEmail(string email);
    }
}
