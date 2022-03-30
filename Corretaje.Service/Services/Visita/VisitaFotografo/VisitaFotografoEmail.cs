using Corretaje.Common.EMail;
using Corretaje.Service.IServices.IVisita.IVisitaFotografo;
using Corretaje.Service.Services.Visita.VisitaBase;
using System.Collections.Generic;

namespace Corretaje.Service.Services.Visita.VisitaFotografo
{
    public class VisitaFotografoEmail : VisitaEmail, IVisitaFotografoEmail
    {
        private readonly IVisitaFotografoConfiguracion _visitaFotografoConfiguracion;
        public VisitaFotografoEmail(
            IEMailService emailService,
            IVisitaFotografoConfiguracion visitaFotografoConfiguracion) : base(emailService, visitaFotografoConfiguracion)
        {
            _visitaFotografoConfiguracion = visitaFotografoConfiguracion;
        }

        public void SendEmailVisitaAgendadaCopiaJefeVentas(string html, List<string> destinatarios)
        {
            var email = new EMail()
            {
                Content = html,
                FromAddress = _visitaFotografoConfiguracion.Emisor,
                Subject = _visitaFotografoConfiguracion.EmailAsuntoVisitaAgendada,
                ToAddresses = destinatarios
            };

            Send(email);
        }

        public void SendEmailVisitaCanceladaCopiaJefeVentas(string html, List<string> destinatarios)
        {
            var email = new EMail()
            {
                Content = html,
                FromAddress = _visitaFotografoConfiguracion.Emisor,
                Subject = _visitaFotografoConfiguracion.EmailAsuntoVisitaCancelada,
                ToAddresses = destinatarios
            };

            Send(email);
        }
    }
}
