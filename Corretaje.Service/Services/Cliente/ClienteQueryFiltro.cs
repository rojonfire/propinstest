using Corretaje.Service.IServices.ICliente;
using MongoDB.Driver;

namespace Corretaje.Service.Services.Cliente
{
    public class ClienteQueryFiltro : IClienteQueryFiltro
    {
        public FilterDefinition<Domain.Cliente> FindByRut(string rut)
        {
            return Builders<Domain.Cliente>.Filter.Where(cliente => cliente.Rut == rut);
        }

        public FilterDefinition<Domain.Cliente> FindByRutAndEmail(string rut, string email)
        {
            return Builders<Domain.Cliente>.Filter.Where(cliente => cliente.Rut == rut && cliente.Mail == email);
        }

        public FilterDefinition<Domain.Cliente> FindByEmail(string email)
        {
            return Builders<Domain.Cliente>.Filter.Where(cliente => cliente.Mail == email);
        }
    }
}
