using Corretaje.Common.EMail;
using Corretaje.Domain;
using Corretaje.Service.IServices.IOrdenCompra;
using Corretaje.Service.IServices.IUsuario;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.OrdenCompra
{
    public class OrdenCompraSendEmail : IOrdenCompraSendEmail
    {
        private readonly IEMailService _emailService;
        private readonly IOrdenCompraConfiguracion _ordenCompraConfiguracion;
        private readonly IUsuarioService _usuarioService;

        public OrdenCompraSendEmail(IEMailService emailService, IOrdenCompraConfiguracion ordenCompraConfiguracion, IUsuarioService usuarioService)
        {
            _emailService = emailService;
            _ordenCompraConfiguracion = ordenCompraConfiguracion;
            _usuarioService = usuarioService;
        }

        public async void SendEmail(OrdenDeCompra ordenCompra, string html, IEnumerable<string> attachmentsPath)
        {
            var usuarioEmail = await GetUsuarioEmail(new ObjectId(ordenCompra.UsuarioId));

            var email = new EMail()
            {
                Content = html,
                FromAddress = _ordenCompraConfiguracion.FromAddress,
                Subject = _ordenCompraConfiguracion.EMailSubject,
                ToAddresses = new List<string> {usuarioEmail },
                AttachmentsPath = attachmentsPath.ToList()
            };

            _emailService.Send(email);
        }

        private async Task<string> GetUsuarioEmail(ObjectId usuarioId)
        {
            var usuario = await _usuarioService.Get(usuarioId);

            return usuario.Email;
        }
    }
}
