using Corretaje.Common.EMail;
using Corretaje.Service.IServices.IPropiedad;
using System.Collections.Generic;
using System.IO;

namespace Corretaje.Service.Services.Propiedad
{
    public class PropiedadEmail : IPropiedadEmail
    {
        private readonly IEMailService _emailService;
        private readonly IPropiedadConfiguracion _propiedadConfiguracion;

        public PropiedadEmail(IEMailService emailService, IPropiedadConfiguracion propiedadConfiguracion)
        {
            _emailService = emailService;
            _propiedadConfiguracion = propiedadConfiguracion;
        }

        public void GenerarYEnviarEmail(IEnumerable<Domain.Propiedad> propiedades)
        {
            var email = GenerarEmail(propiedades);

            _emailService.Send(email);
        }

        private EMail GenerarEmail(IEnumerable<Domain.Propiedad> propiedades)
        {
            return new EMail()
            {
                Content = GetEmailContent(propiedades),
                FromAddress = _propiedadConfiguracion.EmailEmisor,
                Subject = _propiedadConfiguracion.EmailNotificarPropiedadesPorExpirarAsunto,
                ToAddresses = new List<string>() { _propiedadConfiguracion.AdministradorEmail }
            };
        }

        private string GetEmailContent(IEnumerable<Domain.Propiedad> propiedades)
        {
            string nombreArchivo = @"./Template/PropiedadesPorExpirar.cshtml";
            string mailHtml = File.ReadAllText(nombreArchivo);
            string textoParaReemplazar = "[LISTADO-LINKS]";
            var trozoHtmlProcesado = GetLinks(propiedades);
            return mailHtml.Replace(textoParaReemplazar, trozoHtmlProcesado);
        }

        private string GetLinks(IEnumerable<Domain.Propiedad> propiedades)
        {
            string links = "";

            foreach (var propiedad in propiedades)
            {
                links += $"<li>{_propiedadConfiguracion.PaginaPropiedad}{propiedad.Id.ToString()}</li>";
            }

            return links;
        }

        public void SendEmailNotificacionNuevaPropiedadFast(string html, List<string> destinatarios)
        {
            var email = new EMail()
            {
                Content = html,
                FromAddress = _propiedadConfiguracion.EmailEmisor,
                Subject = _propiedadConfiguracion.EmailAsuntoPlanFastContratado,
                ToAddresses = destinatarios
            };

            _emailService.Send(email);
        }

        public void SendEmailNotificacionNuevaPropiedadSubidaPorBroker(string html, List<string> destinatarios)
        {
            var email = new EMail()
            {
                Content = html,
                FromAddress = _propiedadConfiguracion.EmailEmisor,
                Subject = _propiedadConfiguracion.EmailAsuntoPropiedadSubidaPorBroker,
                ToAddresses = destinatarios
            };

            _emailService.Send(email);
        }
        
    }
}
