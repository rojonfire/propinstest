using Corretaje.Domain;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices
{
    public interface IClienteService
    {
        Task<bool> ExisteCliente(string usuarioRut);

        Task<Cliente> GetClienteByRut(string rut);

        Task<Cliente> Get(ObjectId id);

        Task<Cliente> Add(Cliente cliente);

        Task<Cliente> Update(Cliente cliente);

        Task<IEnumerable<Cliente>> GetAll();

        Task<Domain.Cliente> GetClienteByRutAndEmail(string rut, string email);

        Task<Domain.Cliente> GetClienteByEmail(string email);
    }
}
