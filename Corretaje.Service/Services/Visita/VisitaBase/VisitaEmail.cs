using Corretaje.Common.EMail;
using Corretaje.Service.IServices.IVisita.IVisitaBase;
using System.Collections.Generic;

namespace Corretaje.Service.Services.Visita.VisitaBase
{
    public abstract class VisitaEmail : IVisitaEmail
    {
        private readonly IEMailService _emailService;
        private readonly IVisitaConfiguracion _visitaConfiguracion;

        public VisitaEmail(IEMailService emailService, IVisitaConfiguracion visitaConfiguracion)
        {
            _emailService = emailService;
            _visitaConfiguracion = visitaConfiguracion;
        }

        public void Send(EMail email)
        {
            _emailService.Send(email);
        }

        public void SendEmailVisitaAgendada(string html, List<string> destinatarios)
        {
            var email = new EMail()
            {
                Content = html,
                FromAddress = _visitaConfiguracion.Emisor,
                Subject = "Visita virtual",
                ToAddresses = destinatarios
            };

            Send(email);
        }

        public void SendEmailVisitaCancelada(string html, List<string> destinatarios)
        {
            var email = new EMail()
            {
                Content = html,
                FromAddress = _visitaConfiguracion.Emisor,
                Subject = _visitaConfiguracion.EmailAsuntoVisitaCancelada,
                ToAddresses = destinatarios
            };

            Send(email);
        }
    }
}
