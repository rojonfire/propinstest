using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IVisita.IVisitaBase;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IVisita.IVisitaFotografo
{
    public interface IVisitaFotografoService : IVisitaService<VisitaFotografo>
    {
        Task<IEnumerable<VisitaFotografo>> GetByFotografoId(string id);

        void SendEmailVisitaAgendada(string html, List<string> destinatarios);

        void SendEmailVisitaCancelada(string html, List<string> destinatarios);

        void SendEmailVisitaAgendadaCopiaJefeVentas(string html);

        void SendEmailVisitaCanceladaCopiaJefeVentas(string html);
    }
}