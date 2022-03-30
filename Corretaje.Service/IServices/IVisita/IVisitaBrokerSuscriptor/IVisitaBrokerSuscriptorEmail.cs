using Corretaje.Service.IServices.IVisita.IVisitaBase;
using System.Collections.Generic;

namespace Corretaje.Service.IServices.IVisita.IVisitaBrokerSuscriptor
{
    public interface IVisitaBrokerSuscriptorEmail : IVisitaEmail
    {
        void SendEmailVisitaAgendadaCopiaJefeVentas(string html, List<string> destinatarios);
    }
}
