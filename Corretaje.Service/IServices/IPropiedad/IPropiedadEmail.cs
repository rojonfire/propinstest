using Corretaje.Domain;
using System.Collections.Generic;

namespace Corretaje.Service.IServices.IPropiedad
{
    public interface IPropiedadEmail
    {
        void GenerarYEnviarEmail(IEnumerable<Propiedad> propiedades);

        void SendEmailNotificacionNuevaPropiedadFast(string html, List<string> destinatarios);

        void SendEmailNotificacionNuevaPropiedadSubidaPorBroker(string html, List<string> destinatarios);
    }
}
