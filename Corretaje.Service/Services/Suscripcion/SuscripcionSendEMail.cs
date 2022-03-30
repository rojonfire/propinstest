using Corretaje.Common.EMail;
using Corretaje.Service.IServices.ISuscripcion;
using Corretaje.Service.IServices.IUsuario;
using System.Collections.Generic;
using System.Linq;

namespace Corretaje.Service.Services.Suscripcion
{
    public class SuscripcionSendEMail : ISuscripcionSendEMail
    {
        private readonly IEMailService _eMailService;
        private readonly IUsuarioService _usuarioService;
        private readonly ISuscripcionConfiguracion _suscripcionConfiguracion;

        public SuscripcionSendEMail(IEMailService eMailService, IUsuarioService usuarioService, ISuscripcionConfiguracion suscripcionConfiguracion)
        {
            _eMailService = eMailService;
            _usuarioService = usuarioService;
            _suscripcionConfiguracion = suscripcionConfiguracion;
        }

        public async void SendEmailSuscripcionesActualizadas()
        {
            var jefesDeVentas = await _usuarioService.GetUsuariosByTipoCuenta(Domain.Estados.TipoCuenta.JefeDeVentas);
            List<string> emailDestinatarios = jefesDeVentas.Where(i => i.Email != null && i.Email != "").Select(j => j.Email).ToList();
            if (emailDestinatarios != null && emailDestinatarios.Count() > 0)
            {
                SendEMail(emailDestinatarios, _suscripcionConfiguracion.EmailContenido, _suscripcionConfiguracion.EmailAsunto);
            }
        }

        private void SendEMail(List<string> destinatarioEMail, string html, string asunto)
        {
            var eMail = new EMail()
            {
                Content = html,
                FromAddress = _suscripcionConfiguracion.EmailEmisor,
                Subject = asunto,
                ToAddresses = destinatarioEMail
            };

            _eMailService.Send(eMail);
        }
    }
}
