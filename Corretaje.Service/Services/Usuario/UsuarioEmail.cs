using Corretaje.Common.EMail;
using Corretaje.Service.IServices.IUsuario;
using System.Collections.Generic;

namespace Corretaje.Service.Services.Usuario
{
    public class UsuarioEmail : IUsuarioEmail
    {
        private readonly IEMailService _emailService;
        private readonly IUsuarioConfiguracion _usuarioConfiguracion;

        public UsuarioEmail(IEMailService emailService, IUsuarioConfiguracion usuarioConfiguracion)
        {
            _emailService = emailService;
            _usuarioConfiguracion = usuarioConfiguracion;
        }

        public void SendEmailNotificacionCambioContraseña(string html, List<string> destinatarios)
        {
            var email = new EMail()
            {
                Content = html,
                FromAddress = _usuarioConfiguracion.FromAddress,
                Subject = _usuarioConfiguracion.EmailAsuntoNotificacionContraseñaCambiada,
                ToAddresses = destinatarios
            };

            Send(email);
        }

        public void SendEmailRegistroCopiaJefeVentas(string html, List<string> destinatarios)
        {
            var email = new EMail()
            {
                Content = html,
                FromAddress = _usuarioConfiguracion.FromAddress,
                Subject = _usuarioConfiguracion.EmailAsuntoUsuarioRegistrado,
                ToAddresses = destinatarios
            };

            Send(email);
        }

        public void SendEmailVendedorReferidoCopiaJefeVentas(string html, List<string> destinatarios)
        {
            var email = new EMail()
            {
                Content = html,
                FromAddress = _usuarioConfiguracion.FromAddress,
                Subject = _usuarioConfiguracion.EmailAsuntoVendedorReferido,
                ToAddresses = destinatarios
            };

            Send(email);
        }

        public void SendEmailEmbajadorReferidoCopiaJefeVentas(string html, List<string> destinatarios)
        {
            var email = new EMail()
            {
                Content = html,
                FromAddress = _usuarioConfiguracion.FromAddress,
                Subject = _usuarioConfiguracion.EmailAsuntoEmbajadorReferido,
                ToAddresses = destinatarios
            };

            Send(email);
        }

        public void SendEmailVendedorReferido(string html, List<string> destinatarios)
        {
            var email = new EMail()
            {
                Content = html,
                FromAddress = _usuarioConfiguracion.FromAddress,
                Subject = _usuarioConfiguracion.EmailAsuntoHasSidoReferido,
                ToAddresses = destinatarios
            };

            Send(email);
        }

        public void Send(EMail email)
        {
            _emailService.Send(email);
        }
    }
}
