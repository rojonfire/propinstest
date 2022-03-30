using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices.IUsuario;
using Corretaje.Service.IServices.IVisita.IVisitaBrokerSuscriptor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Visita.VisitaBrokerSuscriptor
{
    public class VisitaBrokerSuscriptorService : VisitaBase.VisitaService<Domain.Agenda.VisitaBrokerSuscriptor>, IVisitaBrokerSuscriptorService
    {
        private readonly IVisitaBrokerSuscriptorEmail _visitaBrokerSuscriptorEmail;
        private readonly IVisitaBrokerSuscriptorQueryFiltro _visitaBrokerSuscriptorQueryFiltro;
        private readonly IUsuarioService _usuarioService;

        public VisitaBrokerSuscriptorService(
            IRepository<Domain.Agenda.VisitaBrokerSuscriptor> repository,
            IVisitaBrokerSuscriptorEmail visitaBrokerSuscriptorEmail,
            IVisitaBrokerSuscriptorQueryFiltro visitaBrokerSuscriptorQueryFiltro, IUsuarioService usuarioService) : base(repository, visitaBrokerSuscriptorQueryFiltro)
        {
            _visitaBrokerSuscriptorEmail = visitaBrokerSuscriptorEmail;
            _visitaBrokerSuscriptorQueryFiltro = visitaBrokerSuscriptorQueryFiltro;
            _usuarioService = usuarioService;
        }

        public async Task<IEnumerable<Domain.Agenda.VisitaBrokerSuscriptor>> FiltrarVisitasBrokerSuscriptor(string fechaInicial, string fechaFinal, string brokerId, string suscripcionId, bool mostrarSoloSinConfirmar, bool incluirFechasPasadas, bool incluirFechasFuturas)
        {
            return await _repository.SearchFor(_visitaBrokerSuscriptorQueryFiltro.Filter(fechaInicial, fechaFinal, brokerId, suscripcionId, mostrarSoloSinConfirmar, incluirFechasPasadas, incluirFechasFuturas));
        }

        public void SendEmailVisitaAgendada(string html, List<string> destinatarios)
        {
            _visitaBrokerSuscriptorEmail.SendEmailVisitaAgendada(html, destinatarios);
        }


        public async void SendEmailVisitaAgendadaCopiaJefeVentas(string html)
        {
            var destinatarios = await GetEmailJefesDeVenta();
            if (destinatarios != null)
            {
                _visitaBrokerSuscriptorEmail.SendEmailVisitaAgendadaCopiaJefeVentas(html, destinatarios);
            }
        }

        private async Task<List<string>> GetEmailJefesDeVenta()
        {
            var jefesDeVenta = await _usuarioService.GetUsuariosByTipoCuenta(Estados.TipoCuenta.JefeDeVentas);
            if (jefesDeVenta != null && jefesDeVenta.Count() > 0)
            {
                return jefesDeVenta.Where(i => i.Email != null && i.Email != "").Select(u => u.Email).ToList();
            }
            else
            {
                return null;
            }
        }
    }
}
