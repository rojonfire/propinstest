using Corretaje.Service.IServices;
using Corretaje.Repository;
using System.Threading.Tasks;
using Corretaje.Service.IServices.ICliente;
using System.Linq;
using MongoDB.Bson;
using System.Collections.Generic;

namespace Corretaje.Service.Services
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteQueryFiltro _clienteQueryFiltro;
        private readonly IRepository<Domain.Cliente> _clienteRepository;

        public ClienteService(IClienteQueryFiltro clienteQueryFiltro, IRepository<Domain.Cliente> clienteRepository)
        {
            _clienteQueryFiltro = clienteQueryFiltro;
            _clienteRepository = clienteRepository;
        }

        public async Task<Domain.Cliente> Add(Domain.Cliente cliente)
        {
            return await _clienteRepository.Insert(cliente);
        }

        public async Task<bool> ExisteCliente(string usuarioRut)
        {
            var cliente = await GetClienteByRut(usuarioRut);

            return cliente != null;
        }

        public async Task<Domain.Cliente> Get(ObjectId id)
        {
            return await _clienteRepository.Get(id);
        }

        public async Task<IEnumerable<Domain.Cliente>> GetAll()
        {
            return await _clienteRepository.GetAll();
        }

        public async Task<Domain.Cliente> GetClienteByRut(string rut)
        {
            var clientes = await _clienteRepository.SearchFor(_clienteQueryFiltro.FindByRut(rut));

            return clientes.FirstOrDefault();
        }

        public async Task<Domain.Cliente> GetClienteByRutAndEmail(string rut, string email)
        {
            var clientes = await _clienteRepository.SearchFor(_clienteQueryFiltro.FindByRutAndEmail(rut, email));

            return clientes.FirstOrDefault();
        }

        public async Task<Domain.Cliente> Update(Domain.Cliente cliente)
        {
            return await _clienteRepository.Update(cliente);
        }

        public async Task<Domain.Cliente> GetClienteByEmail(string email)
        {
            var clientes = await _clienteRepository.SearchFor(_clienteQueryFiltro.FindByEmail(email));

            return clientes.FirstOrDefault();
        }
    }
}
