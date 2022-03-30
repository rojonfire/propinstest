using Corretaje.Common.EMail;
using Corretaje.Domain;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IOferta;
using Corretaje.Service.IServices.IUsuario;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Corretaje.Service.Services.Oferta
{
    public class OfertaSendEMail : IOfertaSendEMail
    {
        private readonly IClienteService _clienteService;
        private readonly IEMailService _eMailService;
        private readonly IOfertaConfiguration _ofertaConfiguracion;
        private readonly IUsuarioService _usuarioService;
        private string EmailAsunto { get; set; }

        public OfertaSendEMail(IClienteService clienteService, IEMailService eMailService, IOfertaConfiguration ofertaConfiguracion, IUsuarioService usuarioService)
        {
            _clienteService = clienteService;
            _eMailService = eMailService;
            _ofertaConfiguracion = ofertaConfiguracion;
            _usuarioService = usuarioService;
        }

        private async Task<string> GetEmailUsuario(ObjectId destinatarioId)
        {
            var destinatario = await _usuarioService.Get(destinatarioId);

            return destinatario?.Email;
        }

        private async Task<string> GetEmailCliente(ObjectId destinatarioId)
        {
            var destinatario = await _clienteService.Get(destinatarioId);

            return destinatario?.Mail;
        }

        private void SendEMail(string destinatarioEMail, string html)
        {
            var eMail = new EMail()
            {
                Content = html,
                FromAddress = _ofertaConfiguracion.FromAddress,
                Subject = EmailAsunto,
                ToAddresses = new List<string> { destinatarioEMail }
            };

            _eMailService.Send(eMail);
        }

        public async void OfertaSendEMailOfertaAceptadaComprador(Domain.Oferta oferta, string html)
        {
            var destinatarioEMail = await GetEmailUsuario(new ObjectId(oferta.OfertadorId));

            if (string.IsNullOrWhiteSpace(destinatarioEMail))
            {
                return;
            }

            EmailAsunto = _ofertaConfiguracion.EmailAsuntoOfertaAceptadaComprador;

            SendEMail(destinatarioEMail, html);
        }

        public async void OfertaSendEMailOfertaAceptadaVendedor(Domain.Oferta oferta, string html)
        {
            var destinatarioEMail = await GetEmailCliente(new ObjectId(oferta.PropietarioId));

            if (string.IsNullOrWhiteSpace(destinatarioEMail))
            {
                return;
            }

            EmailAsunto = _ofertaConfiguracion.EmailAsuntoOfertaAceptadaVendedor;

            SendEMail(destinatarioEMail, html);
        }

        public async void OfertaSendEMailOfertaDeclinadaComprador(Domain.Oferta oferta, string html)
        {
            var destinatarioEMail = await GetEmailUsuario(new ObjectId(oferta.OfertadorId));

            if (!string.IsNullOrWhiteSpace(destinatarioEMail))
            {
                EmailAsunto = _ofertaConfiguracion.EmailAsuntoOfertaDeclinada;

                SendEMail(destinatarioEMail, html);
            }
        }

        public async void OfertaSendEMailOfertaDeclinadaVendedor(Domain.Oferta oferta, string html)
        {
            var destinatarioEMail = await GetEmailCliente(new ObjectId(oferta.PropietarioId));

            if (!string.IsNullOrWhiteSpace(destinatarioEMail))
            {
                EmailAsunto = _ofertaConfiguracion.EmailAsuntoOfertaDeclinada;

                SendEMail(destinatarioEMail, html);
            }
        }

        public async void OfertaSendEMailOfertaRechazadaComprador(Domain.Oferta oferta, string html)
        {
            var destinatarioEmail = await GetEmailUsuario(new ObjectId(oferta.OfertadorId));

            if (string.IsNullOrWhiteSpace(destinatarioEmail))
            {
                return;
            }

            EmailAsunto = _ofertaConfiguracion.EmailAsuntoOfertaRechazadaComprador;

            SendEMail(destinatarioEmail, html);
        }

        public async void OfertaSendEMailOfertaRechazadaVendedor(Domain.Oferta oferta, string html)
        {
            var destinatarioEmail = await GetEmailCliente(new ObjectId(oferta.PropietarioId));

            if (string.IsNullOrWhiteSpace(destinatarioEmail))
            {
                return;
            }

            EmailAsunto = _ofertaConfiguracion.EmailAsuntoOfertaRechazadaVendedor;

            SendEMail(destinatarioEmail, html);
        }

        public async void OfertaSendEmailOfertaEmitidaVendedor(Domain.Oferta oferta, string html)
        {
            var destinatarioEmail = await GetEmailCliente(new ObjectId(oferta.PropietarioId));

            if (string.IsNullOrWhiteSpace(destinatarioEmail))
            {
                return;
            }

            EmailAsunto = _ofertaConfiguracion.EmailAsuntoOfertaEmitidaVendedor;

            SendEMail(destinatarioEmail, html);
        }

        public async void OfertaSendEmailOfertaEmitidaComprador(Domain.Oferta oferta, string html)
        {
            var destinatarioEmail = await GetEmailUsuario(new ObjectId(oferta.OfertadorId));

            if (string.IsNullOrWhiteSpace(destinatarioEmail))
            {
                return;
            }

            EmailAsunto = _ofertaConfiguracion.EmailAsuntoOfertaEmitidaComprador;

            SendEMail(destinatarioEmail, html);
        }

        private bool EsEmitidaPorCliente(Domain.Oferta oferta)
        {
            return oferta.EmitidaPor == Estados.OfertaEmision.Cliente;
        }

        private async Task<string> GetEmailDestinatarioOfertaRechazada(Domain.Oferta oferta)
        {
            if (EsEmitidaPorCliente(oferta))
            {
                return await GetEmailUsuario(new ObjectId(oferta.OfertadorId));
            }

            return await GetEmailCliente(new ObjectId(oferta.PropietarioId));
        }

        private async Task<List<string>> GetEmailsJefesDeVenta()
        {
            var jefesDeVenta = await _usuarioService.GetUsuariosByTipoCuenta(Estados.TipoCuenta.JefeDeVentas);
            if (jefesDeVenta != null)
            {
                return jefesDeVenta.Where(i => i.Email != null && i.Email != "").Select(u => u.Email).ToList();
            } else
            {
                return null;
            }
        }

        public async void OfertaSendEmailOfertaEmitidaCopiaAdministrador(string html)
        {
            List<string> destinatarios = await GetEmailsJefesDeVenta();
            if (destinatarios == null)
            {
                destinatarios = new List<string> { _ofertaConfiguracion.EmailAlvaro };
            } else
            {
                destinatarios.Add(_ofertaConfiguracion.EmailAlvaro);
            }

            var email = new EMail()
            {
                Content = html,
                FromAddress = _ofertaConfiguracion.FromAddress,
                Subject = _ofertaConfiguracion.EmailAsuntoOfertaEmitidaCopiaAdministrador,
                ToAddresses = destinatarios
            };

            Send(email);
        }

        public void Send(EMail email)
        {
            _eMailService.Send(email);
        }
    }
}
