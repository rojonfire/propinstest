using Corretaje.Common.EMail;
using Corretaje.Service.IServices.IVisita.IVisitaBrokerSuscriptor;
using Corretaje.Service.Services.Visita.VisitaBase;
using System.Collections.Generic;

namespace Corretaje.Service.Services.Visita.VisitaBrokerSuscriptor
{
    public class VisitaBrokerSuscriptorEmail : VisitaEmail, IVisitaBrokerSuscriptorEmail
    {
        private readonly IVisitaBrokerSuscriptorConfiguracion _visitaBrokerSuscriptorConfiguracion;

        public VisitaBrokerSuscriptorEmail(
            IEMailService emailService,
            IVisitaBrokerSuscriptorConfiguracion visitaBrokerSuscriptorConfiguracion) : base(emailService, visitaBrokerSuscriptorConfiguracion)
        {
            _visitaBrokerSuscriptorConfiguracion = visitaBrokerSuscriptorConfiguracion;
        }

        public void SendEmailVisitaAgendadaCopiaJefeVentas(string html, List<string> destinatarios)
        {
            var email = new EMail()
            {
                Content = html,
                FromAddress = _visitaBrokerSuscriptorConfiguracion.Emisor,
                Subject = _visitaBrokerSuscriptorConfiguracion.EmailAsuntoVisitaAgendada,
                ToAddresses = destinatarios
            };

            Send(email);
        }
    }
}
