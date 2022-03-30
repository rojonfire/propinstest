using Corretaje.Domain;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IOrdenCompra;
using Corretaje.Service.IServices.IUsuario;
using MongoDB.Bson;

namespace Corretaje.Service.Services.OrdenCompra
{
    public class OrdenCompraCliente : IOrdenCompraCliente
    {
        private readonly IClienteService _clienteService;
        private readonly IUsuarioService _usuarioService;

        public OrdenCompraCliente(IClienteService clienteService, IUsuarioService usuarioService)
        {
            _clienteService = clienteService;
            _usuarioService = usuarioService;
        }

        public async void HandleClienteDesdeOrdenCompra(OrdenDeCompra ordenCompra)
        {
            var usuario = await _usuarioService.Get(new ObjectId(ordenCompra.UsuarioId));

            if (await _clienteService.ExisteCliente(usuario.Rut))
            {
                return;
            }

            var cliente = GetCliente(usuario);

            cliente = await _clienteService.Add(cliente);

            usuario.ClienteId = cliente.Id.ToString();

            await _usuarioService.Update(usuario);
        }

        private static Domain.Cliente GetCliente(Domain.Usuario usuario)
        {
            return new Domain.Cliente()
            {
                Nombres = usuario.Nombres,
                Rut = usuario.Rut,
                Apellidos = usuario.Apellidos,
                Direccion = usuario.Direccion,
                EstadoCivil = usuario.EstadoCivil,
                FechaNacimiento = usuario.FechaNacimiento,
                Mail = usuario.Email,
                Oficio = usuario.Oficio,
                Password = usuario.Password,
                Telefono = usuario.Telefono
            };
        }
    }
}

