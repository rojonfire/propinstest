using Corretaje.Service.IServices.IVisita.IVisitaBase;
using System.Collections.Generic;

namespace Corretaje.Service.IServices.IVisita.IVisitaUsuario
{
    public interface IVisitaUsuarioEmail : IVisitaEmail
    {
        void SendEmailAnfitrionAsiste(string html, List<string> destinatarios);

        void SendEmailVisitaAgendadaCopiaJefeVentas(string html, List<string> destinatarios);

        void SendEmailVisitaCanceladaCopiaJefeVentas(string html, List<string> destinatarios);
    }
}
