using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Corretaje.Repository;
using Corretaje.Service.IServices.IUsuario;
using Corretaje.Service.IServices.IVisita.IVisitaAgente;

namespace Corretaje.Service.Services.Visita.VisitaAgente
{
    public class VisitaAgenteService : VisitaBase.VisitaService<Domain.Agenda.VisitaAgente>, IVisitaAgenteService
    {
        private readonly IVisitaAgenteEmail _visitaAgenteEmail;
        private readonly IVisitaAgenteQueryFiltro _visitaAgenteQueryFiltro;
        private readonly IUsuarioService _usuarioService;

        public VisitaAgenteService(
            IRepository<Domain.Agenda.VisitaAgente> repository,
            IVisitaAgenteEmail visitaAgenteEmail,
            IVisitaAgenteQueryFiltro visitaAgenteQueryFiltro, IUsuarioService usuarioService) : base(repository, visitaAgenteQueryFiltro)
        {
            _visitaAgenteEmail = visitaAgenteEmail;
            _visitaAgenteQueryFiltro = visitaAgenteQueryFiltro;
            _usuarioService = usuarioService;
        }

        public Task<IEnumerable<Domain.Agenda.VisitaAgente>> GetByAgenteIdAndProyectoId(string id, string proyectoId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Domain.Agenda.VisitaAgente> GetByUserIdAndProjectId(string usuarioId, string proyectoId)
        {
            return (await _repository.SearchFor(_visitaAgenteQueryFiltro.FindByUsuarioIdAndProyectoId(usuarioId, proyectoId))).OrderByDescending(e => e.CreatedAt).FirstOrDefault();
        }

        public async Task<IEnumerable<Domain.Agenda.VisitaAgente>> GetByProjectId( string proyectoId)
        {
            return (await _repository.SearchFor(_visitaAgenteQueryFiltro.FindByProyectoId(proyectoId))).OrderByDescending(e => e.CreatedAt);
        }

        public async Task<IEnumerable<Domain.Agenda.VisitaAgente>> GetByAgenteId(string id)
        {
            return await _repository.SearchFor(_visitaAgenteQueryFiltro.FindByAgenteId(id));
        }

        public void SendEmailVisitaAgendada(string html, List<string> destinatarios)
        {
            _visitaAgenteEmail.SendEmailVisitaAgendada(html, destinatarios);
        }

        public void SendEmailVisitaCancelada(string html, List<string> destinatarios)
        {
            _visitaAgenteEmail.SendEmailVisitaCancelada(html, destinatarios);
        }
    }
}