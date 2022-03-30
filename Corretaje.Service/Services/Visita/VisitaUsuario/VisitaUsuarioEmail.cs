using Corretaje.Common.EMail;
using Corretaje.Service.IServices.IVisita.IVisitaUsuario;
using Corretaje.Service.Services.Visita.VisitaBase;
using System.Collections.Generic;

namespace Corretaje.Service.Services.Visita.VisitaUsuario
{
    public class VisitaUsuarioEmail : VisitaEmail, IVisitaUsuarioEmail
    {
        private readonly IVisitaUsuarioConfiguracion _visitaUsuarioConfiguracion;
        public VisitaUsuarioEmail(
            IEMailService emailService,
            IVisitaUsuarioConfiguracion visitaUsuarioConfiguracion) : base(emailService, visitaUsuarioConfiguracion)
        {
            _visitaUsuarioConfiguracion = visitaUsuarioConfiguracion;
        }

        public void SendEmailAnfitrionAsiste(string html, List<string> destinatarios)
        {
            var email = new EMail
            {
                Content = html,
                FromAddress = _visitaUsuarioConfiguracion.Emisor,
                Subject = _visitaUsuarioConfiguracion.EmailAsuntoAnfitrionAsiste,
                ToAddresses = destinatarios
            };

            Send(email);
        }

        public void SendEmailVisitaAgendadaCopiaJefeVentas(string html, List<string> destinatarios)
        {
            var email = new EMail()
            {
                Content = html,
                FromAddress = _visitaUsuarioConfiguracion.Emisor,
                Subject = _visitaUsuarioConfiguracion.EmailAsuntoVisitaAgendada,
                ToAddresses = destinatarios
            };

            Send(email);
        }

        public void SendEmailVisitaCanceladaCopiaJefeVentas(string html, List<string> destinatarios)
        {
            var email = new EMail()
            {
                Content = html,
                FromAddress = _visitaUsuarioConfiguracion.Emisor,
                Subject = _visitaUsuarioConfiguracion.EmailAsuntoVisitaCancelada,
                ToAddresses = destinatarios
            };

            Send(email);
        }
    }
}
