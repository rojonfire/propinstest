using Corretaje.Service.IServices.IVisita.IVisitaBase;
using System.Collections.Generic;

namespace Corretaje.Service.IServices.IVisita.IVisitaFotografo
{
    public interface IVisitaFotografoEmail : IVisitaEmail
    {
        void SendEmailVisitaAgendadaCopiaJefeVentas(string html, List<string> destinatarios);

        void SendEmailVisitaCanceladaCopiaJefeVentas(string html, List<string> destinatarios);
    }
}
