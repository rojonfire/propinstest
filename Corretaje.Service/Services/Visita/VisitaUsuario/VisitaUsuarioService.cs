using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices.IOrdenCompra;
using Corretaje.Service.IServices.IUsuario;
using Corretaje.Service.IServices.IVisita.IVisitaUsuario;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Visita.VisitaUsuario
{
    public class VisitaUsuarioService : VisitaBase.VisitaService<Domain.Agenda.VisitaUsuario>, IVisitaUsuarioService
    {
        private readonly IOrdenCompraService _ordenCompraService;
        private readonly IUsuarioService _usuarioService;
        private readonly IVisitaUsuarioEmail _visitaUsuarioEmail;
        private readonly IVisitaUsuarioQueryFiltro _visitaUsuarioQueryFiltro;

        public VisitaUsuarioService(
            IOrdenCompraService ordenCompraService,
            IRepository<Domain.Agenda.VisitaUsuario> repository,
            IUsuarioService usuarioService,
            IVisitaUsuarioEmail visitaUsuarioEmail,
            IVisitaUsuarioQueryFiltro visitaUsuarioQueryFiltro) : base(repository, visitaUsuarioQueryFiltro)
        {
            _ordenCompraService = ordenCompraService;
            _usuarioService = usuarioService;
            _visitaUsuarioEmail = visitaUsuarioEmail;
            _visitaUsuarioQueryFiltro = visitaUsuarioQueryFiltro;
        }

        public async Task<IEnumerable<Domain.Agenda.VisitaUsuario>> GetByUsuarioIdAndFecha(string id, DateTime fecha)
        {
            return await _repository.SearchFor(_visitaUsuarioQueryFiltro.FindByUsuarioIdAndFecha(id, fecha));
        }

        public async Task<IEnumerable<Domain.Agenda.VisitaUsuario>> GetHorarioClientesConServicioAnfitrion()
        {
            var ordenesCompra = await _ordenCompraService.GetOrdenesCompraConServicioAnfitrion();

            ordenesCompra = ordenesCompra.GroupBy(ordenCompra => ordenCompra.UsuarioId).Select(duplicadoById => duplicadoById.FirstOrDefault());

            var clientesId = new List<string>();

            foreach (var ordenCompra in ordenesCompra)
            {
                var clienteId = await _usuarioService.GetClienteId(new ObjectId(ordenCompra.UsuarioId));

                clientesId.Add(clienteId);
            }

            return await _repository.SearchFor(_visitaUsuarioQueryFiltro.FindByClientesId(clientesId));
        }

        public async Task<IEnumerable<Domain.Agenda.VisitaUsuario>> Filtrar(string fechaInicial, string fechaFinal, string brokerId, string suscripcionId, bool mostrarSoloSinConfirmar, bool incluirFechasPasadas, bool incluirFechasFuturas)
        {
            return await _repository.SearchFor(_visitaUsuarioQueryFiltro.Filter(fechaInicial, fechaFinal, brokerId, suscripcionId, mostrarSoloSinConfirmar, incluirFechasPasadas, incluirFechasFuturas));
        }

        public void SendEmailAnfitrionAsiste(string html, List<string> destinatarios)
        {
            _visitaUsuarioEmail.SendEmailAnfitrionAsiste(html, destinatarios);
        }

        public void SendEmailVisitaAgendada(string html, List<string> destinatarios)
        {
            _visitaUsuarioEmail.SendEmailVisitaAgendada(html, destinatarios);
        }

        public void SendEmailVisitaCancelada(string html, List<string> destinatarios)
        {
            _visitaUsuarioEmail.SendEmailVisitaCancelada(html, destinatarios);
        }

        public async void SendEmailVisitaAgendadaCopiaJefeVentas(string html)
        {
            var destinatarios = await GetEmailJefesDeVenta();
            if (destinatarios != null)
            {
                _visitaUsuarioEmail.SendEmailVisitaAgendadaCopiaJefeVentas(html, destinatarios);
            }
        }

        public async void SendEmailVisitaCanceladaCopiaJefeVentas(string html)
        {
            var destinatarios = await GetEmailJefesDeVenta();
            if (destinatarios != null)
            {
                _visitaUsuarioEmail.SendEmailVisitaCanceladaCopiaJefeVentas(html, destinatarios);
            }
        }

        private async Task<List<string>> GetEmailJefesDeVenta()
        {
            var jefesDeVenta = await _usuarioService.GetUsuariosByTipoCuenta(Estados.TipoCuenta.JefeDeVentas);
            if (jefesDeVenta != null && jefesDeVenta.Count() > 0)
            {
                return jefesDeVenta.Where(i => i.Email != null && i.Email != "").Select(u => u.Email).ToList();
            }
            else {
                return null;
            }
        }
    }
}
