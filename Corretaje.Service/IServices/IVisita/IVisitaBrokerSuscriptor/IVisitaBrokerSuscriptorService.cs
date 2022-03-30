using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IVisita.IVisitaBase;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IVisita.IVisitaBrokerSuscriptor
{
    public interface IVisitaBrokerSuscriptorService : IVisitaService<VisitaBrokerSuscriptor>
    {
        Task<IEnumerable<VisitaBrokerSuscriptor>> FiltrarVisitasBrokerSuscriptor(string fechaInicial, string fechaFinal, string brokerId, string suscripcionId, bool mostrarSoloSinConfirmar, bool incluirFechasPasadas, bool incluirFechasFuturas);

        void SendEmailVisitaAgendada(string html, List<string> destinatarios);

        void SendEmailVisitaAgendadaCopiaJefeVentas(string html);
    }
}
