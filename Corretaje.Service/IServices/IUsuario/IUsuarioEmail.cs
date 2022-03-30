using System.Collections.Generic;

namespace Corretaje.Service.IServices.IUsuario
{
    public interface IUsuarioEmail
    {
        void SendEmailNotificacionCambioContraseña(string html, List<string> destinatarios);

        void SendEmailRegistroCopiaJefeVentas(string html, List<string> destinatarios);

        void SendEmailVendedorReferidoCopiaJefeVentas(string html, List<string> destinatarios);

        void SendEmailEmbajadorReferidoCopiaJefeVentas(string html, List<string> destinatarios);

        void SendEmailVendedorReferido(string html, List<string> destinatarios);
    }
}
