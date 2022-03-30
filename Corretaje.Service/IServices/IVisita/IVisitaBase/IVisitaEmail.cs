using System.Collections.Generic;

namespace Corretaje.Service.IServices.IVisita.IVisitaBase
{
    public interface IVisitaEmail
    {
        void SendEmailVisitaAgendada(string html, List<string> destinatarios);

        void SendEmailVisitaCancelada(string html, List<string> destinatarios);
    }
}
