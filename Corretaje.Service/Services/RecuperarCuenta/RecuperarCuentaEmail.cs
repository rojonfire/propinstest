using Corretaje.Common.EMail;
using Corretaje.Service.IServices.IRecuperarCuenta;
using System.Collections.Generic;

namespace Corretaje.Service.Services.RecuperarCuenta
{
    public class RecuperarCuentaEmail : IRecuperarCuentaEmail
    {
        private readonly IEMailService _eMailService;
        private readonly IRecuperarCuentaConfiguracion _recuperarCuentaConfiguracion;

        public RecuperarCuentaEmail(IEMailService eMailService, IRecuperarCuentaConfiguracion recuperarCuentaConfiguracion)
        {
            _eMailService = eMailService;
            _recuperarCuentaConfiguracion = recuperarCuentaConfiguracion;
        }

        public void SendEmail(string emailDestinatario, string mailHtml)
        {
            var mail = new EMail()
            {
                Content = mailHtml,
                FromAddress = _recuperarCuentaConfiguracion.EmailEmisor,
                Subject = _recuperarCuentaConfiguracion.EmailAsunto,
                ToAddresses = new List<string>() { emailDestinatario }
            };

            _eMailService.Send(mail);
        }
    }
}
