﻿using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IUsuario;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Usuario
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IClienteService _clienteService;
        private readonly IRepository<Domain.Usuario> _usuarioRepository;
        private readonly IRespuestaDelServicio _respuestaDelServicio;
        private readonly IUsuarioCuenta _usuarioCuenta;
        private readonly IUsuarioQueryFiltro _usuarioQueryFiltro;
        private readonly IUsuarioEmail _usuarioEmail;

        public UsuarioService(IClienteService clienteService, IRepository<Domain.Usuario> usuarioRepository, 
            IRespuestaDelServicio respuestaDelServicio, IUsuarioCuenta usuarioCuenta, 
            IUsuarioQueryFiltro usuarioQueryFiltro, IUsuarioEmail usuarioEmail)
        {
            _clienteService = clienteService;
            _usuarioRepository = usuarioRepository;
            _usuarioCuenta = usuarioCuenta;
            _usuarioQueryFiltro = usuarioQueryFiltro;
            _respuestaDelServicio = respuestaDelServicio;
            _usuarioEmail = usuarioEmail;
        }

        public async Task<ResultadoDelProceso> Validar(Domain.Usuario usuario)
        {
            var usuarioByEmail = await GetByEmail(usuario.Email);

            if (usuarioByEmail != null && usuarioByEmail.Password != null)
            {
                return _respuestaDelServicio.RetornarValidacion(null, $"El mail {usuario.Email} ya ha sido utilizado");
            }

            var usuarioByRut = await GetByRut(usuario.Rut);

            if (usuarioByRut != null && usuarioByRut.Password != null)
            {
                return _respuestaDelServicio.RetornarValidacion(null, $"El rut {usuario.Rut} ya ha sido utilizado");
            }

            //dentro de los 48 hrs despues de ser referido y no es embajador
            if (usuarioByEmail != null && usuarioByEmail.Password == null && !usuarioByEmail.EsEmbajador && usuarioByEmail.CreatedAt.AddDays(2).CompareTo(new DateTime()) < 0)
            {
                return _respuestaDelServicio.RetornarValidacion(null, "Este registro ya no es válido");
            }

            return _respuestaDelServicio.RetornarOk("", "");
        }

        public async Task<ResultadoDelProceso> ValidarVendedor(Domain.Usuario usuario)
        {
            var usuarioByEmail = await GetByEmail(usuario.Email);

            if (usuarioByEmail != null)
            {
                return _respuestaDelServicio.RetornarValidacion(null, $"El mail {usuario.Email} ya ha sido utilizado");
            }
            
            return _respuestaDelServicio.RetornarOk("", "");
        }

        public async Task<Domain.Usuario> GetByRut(string rut)
        {
            var usuario = (await _usuarioRepository.SearchFor(_usuarioQueryFiltro.FindByRut(rut))).FirstOrDefault();

            return usuario;
        }

        public async Task<Page<Domain.Usuario>> GetByEsVendedor(int pageSize, int page, bool esVendedor)
        {
            FilterDefinition<Domain.Usuario> filter = _usuarioQueryFiltro.FindByEsVendedor(esVendedor);
           
            var sort = _usuarioQueryFiltro.SortByFechaCreacion();
            var usuarios = await _usuarioRepository.SearchFor(filter);
            int totalUsuarios = usuarios.Count();

            var propiedades = await _usuarioRepository.Pagination(filter, page, pageSize, sort);

            Page<Domain.Usuario> paginated = new Page<Domain.Usuario>();
            paginated.CurrentPage = page;
            paginated.Results = propiedades;
            paginated.TotalResults = totalUsuarios;
            Double totalPagesRatio = Double.Parse(totalUsuarios.ToString()) / Double.Parse(pageSize.ToString());
            paginated.TotalPages = int.Parse(Math.Ceiling(totalPagesRatio).ToString());

            return paginated;
        }

        public async Task<Page<Domain.Usuario>> GetUsuariosPaginados(int pageSize, int page, int tipoCuenta, string referidoPor, bool soloEmbajadores)
        {
            FilterDefinition<Domain.Usuario> filter = _usuarioQueryFiltro.Filtrar(tipoCuenta, referidoPor, soloEmbajadores);

            var sort = _usuarioQueryFiltro.SortByFechaCreacion();
            var usuarios = await _usuarioRepository.SearchFor(filter);
            int totalUsuarios = usuarios.Count();

            var usuariosPaginados = await _usuarioRepository.Pagination(filter, page, pageSize, sort);

            Page<Domain.Usuario> paginated = new Page<Domain.Usuario>();
            paginated.CurrentPage = page;
            paginated.Results = usuariosPaginados;
            paginated.TotalResults = totalUsuarios;
            Double totalPagesRatio = Double.Parse(totalUsuarios.ToString()) / Double.Parse(pageSize.ToString());
            paginated.TotalPages = int.Parse(Math.Ceiling(totalPagesRatio).ToString());

            return paginated;
        }

        public async Task<Domain.Usuario> AddAgent(Domain.Usuario user)
        {
            _usuarioCuenta.SetAgentType(user);

            return await Insert(user);
        }

        public async Task<Domain.Usuario> AddAdministrador(Domain.Usuario usuario)
        {
            _usuarioCuenta.SetTipoAdministrador(usuario);

            return await Insert(usuario);
        }

        public async Task<Domain.Usuario> AddUsuario(Domain.Usuario usuario)
        {
            //TODO: hacer que funcione :(
            //_usuarioCuenta.SetTipoUsuario(usuario);

            return await Insert(usuario);
        }

        public async Task<Domain.Usuario> Get(ObjectId usuarioId)
        {
            var usuario = await _usuarioRepository.Get(usuarioId);

            return usuario;
        }

        public async Task<Domain.Usuario> GetByEmail(string email)
        {
            var usuario = (await _usuarioRepository.SearchFor(_usuarioQueryFiltro.FindByEmail(email))).FirstOrDefault();

            return usuario;
        }

        public async Task<Domain.Usuario> GetByLogin(string password, string email)
        {
            return (await _usuarioRepository.SearchFor(_usuarioQueryFiltro.FindByLogin(password, email))).FirstOrDefault();
        }

        public async Task<Domain.Usuario> Update(Domain.Usuario usuario)
        {
            return await _usuarioRepository.Update(usuario);
        }

        public async Task<Domain.Usuario> RestablecerContraseña(Domain.Usuario usuario, string password)
        {
            SetContraseña(usuario, password);

            return await Update(usuario);
        }

        public async Task<Domain.Usuario> RestablecerContraseña(string password, string email)
        {
            var usuario = await GetByEmail(email);

            return await RestablecerContraseña(usuario, password);
        }

        public async Task<IEnumerable<Domain.Usuario>> GetAdministradores()
        {
            return await _usuarioRepository.SearchFor(_usuarioQueryFiltro.FindAdministradores());
        }

        public async Task<IEnumerable<Domain.Usuario>> GetAll()
        {
            return await _usuarioRepository.GetAll();
        }

        public async Task<IEnumerable<Domain.Usuario>> GetUsuarios()
        {
            return await _usuarioRepository.SearchFor(_usuarioQueryFiltro.FindUsuarios());
        }

        public async Task<IEnumerable<Domain.Usuario>> GetUsuariosByOficio(string oficio)
        {
            return await _usuarioRepository.SearchFor(_usuarioQueryFiltro.FindUsuariosByOficio(oficio));
        }

        private async Task<Domain.Usuario> Insert(Domain.Usuario usuario)
        {
            return await _usuarioRepository.Insert(usuario);
        }

        public async Task<string> GetClienteId(ObjectId usuarioId)
        {
            var usuario = await _usuarioRepository.Get(usuarioId);

            if (usuario == null)
            {
                return null;
            }

            var cliente = await _clienteService.GetClienteByRut(usuario.Rut);

            if (cliente == null)
            {
                return null;
            }

            return cliente.Id.ToString();
        }

        private void SetContraseña(Domain.Usuario usuario, string password)
        {
            usuario.Password = password;
        }

        public async void Eliminar(ObjectId id)
        {
            await _usuarioRepository.Delete(id);
        }

        public async Task<IEnumerable<Domain.Usuario>> GetUsuariosById(IEnumerable<ObjectId> usuariosId)
        {
            return await _usuarioRepository.SearchFor(_usuarioQueryFiltro.FindUsuariosById(usuariosId));
        }

        public async Task<IEnumerable<Domain.Usuario>> GetUsuariosByTipoCuenta(Estados.TipoCuenta tipoCuenta)
        {
            return await _usuarioRepository.SearchFor(_usuarioQueryFiltro.FindByTipoCuenta(tipoCuenta));
        }

        public async Task<Domain.Usuario> GetUsuarioByEmailAndRut(string email, string rut)
        {
            var users = await _usuarioRepository.SearchFor(_usuarioQueryFiltro.FindByEmailAndRut(email, rut));
            return users.FirstOrDefault();
        }

        public void SendEmailNotificacionCambioContraseña(string html, string emailDestinatario)
        {
            _usuarioEmail.SendEmailNotificacionCambioContraseña(html, new List<string> { emailDestinatario });
        }

        public async void SendEmailRegistroCopiaJefeVentas(string html)
        {
            var jefesDeVenta = await GetUsuariosByTipoCuenta(Estados.TipoCuenta.JefeDeVentas);
            if (jefesDeVenta != null)
            {
                var destinatarios = jefesDeVenta.Where(i => i.Email != null && i.Email != "").Select(u => u.Email).ToList();
                if (destinatarios != null && destinatarios.Count() > 0)
                {
                    _usuarioEmail.SendEmailRegistroCopiaJefeVentas(html, destinatarios);
                }
            }
        }

        public async void SendEmailVendedorReferidoCopiaJefeVentas(string html)
        {
            var jefesDeVenta = await GetUsuariosByTipoCuenta(Estados.TipoCuenta.JefeDeVentas);
            if (jefesDeVenta != null)
            {
                var destinatarios = jefesDeVenta.Where(i => i.Email != null && i.Email != "").Select(u => u.Email).ToList();
                if (destinatarios != null && destinatarios.Count() > 0)
                {
                    _usuarioEmail.SendEmailVendedorReferidoCopiaJefeVentas(html, destinatarios);
                }
            }
        }

        public async void SendEmailEmbajadorReferidoCopiaJefeVentas(string html)
        {
            var jefesDeVenta = await GetUsuariosByTipoCuenta(Estados.TipoCuenta.JefeDeVentas);
            if (jefesDeVenta != null)
            {
                var destinatarios = jefesDeVenta.Where(i => i.Email != null && i.Email != "").Select(u => u.Email).ToList();
                if (destinatarios != null && destinatarios.Count() > 0)
                {
                    _usuarioEmail.SendEmailEmbajadorReferidoCopiaJefeVentas(html, destinatarios);
                }
            }
        }

        public async void SendEmailVendedorReferido(string html, string email)
        {
            _usuarioEmail.SendEmailVendedorReferido(html, new List<string> { email });
        }
    }
}
