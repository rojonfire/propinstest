using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices.IUsuario;
using Corretaje.Service.IServices.IVisita.IVisitaFotografo;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Corretaje.Service.Services.Visita.VisitaFotografo
{
    public class VisitaFotografoService : VisitaBase.VisitaService<Domain.Agenda.VisitaFotografo>, IVisitaFotografoService
    {
        private readonly IVisitaFotografoEmail _visitaFotografoEmail;
        private readonly IVisitaFotografoQueryFiltro _visitaFotografoQueryFiltro;
        private readonly IUsuarioService _usuarioService;

        public VisitaFotografoService(
            IRepository<Domain.Agenda.VisitaFotografo> repository,
            IVisitaFotografoEmail visitaFotografoEmail,
            IVisitaFotografoQueryFiltro visitaFotografoQueryFiltro, IUsuarioService usuarioService) : base(repository, visitaFotografoQueryFiltro)
        {
            _visitaFotografoEmail = visitaFotografoEmail;
            _visitaFotografoQueryFiltro = visitaFotografoQueryFiltro;
            _usuarioService = usuarioService;
        }

        public async Task<IEnumerable<Domain.Agenda.VisitaFotografo>> GetByFotografoId(string id)
        {
            return await _repository.SearchFor(_visitaFotografoQueryFiltro.FindByFotografoId(id));
        }

        public void SendEmailVisitaAgendada(string html, List<string> destinatarios)
        {
            _visitaFotografoEmail.SendEmailVisitaAgendada(html, destinatarios);
        }

        public void SendEmailVisitaCancelada(string html, List<string> destinatarios)
        {
            _visitaFotografoEmail.SendEmailVisitaCancelada(html, destinatarios);
        }

        public async void SendEmailVisitaAgendadaCopiaJefeVentas(string html)
        {
            var destinatarios = await GetEmailJefesDeVenta();
            if (destinatarios != null)
            {
                _visitaFotografoEmail.SendEmailVisitaAgendadaCopiaJefeVentas(html, destinatarios);
            }
        }

        public async void SendEmailVisitaCanceladaCopiaJefeVentas(string html)
        {
            var destinatarios = await GetEmailJefesDeVenta();
            if (destinatarios != null)
            {
                _visitaFotografoEmail.SendEmailVisitaCanceladaCopiaJefeVentas(html, destinatarios);
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
