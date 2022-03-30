using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IVisita.IVisitaBase;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IVisita.IVisitaAgente
{
    public interface IVisitaAgenteService : IVisitaService<VisitaAgente>
    {
        Task<IEnumerable<VisitaAgente>> GetByAgenteIdAndProyectoId(string id, string proyectoId);

        void SendEmailVisitaAgendada(string html, List<string> destinatarios);

        void SendEmailVisitaCancelada(string html, List<string> destinatarios);

        Task<IEnumerable<VisitaAgente>> GetByAgenteId(string id);

        Task<Domain.Agenda.VisitaAgente> GetByUserIdAndProjectId(string usuarioId, string proyectoId);

        Task<IEnumerable<VisitaAgente>> GetByProjectId( string proyectoId);
    }
}