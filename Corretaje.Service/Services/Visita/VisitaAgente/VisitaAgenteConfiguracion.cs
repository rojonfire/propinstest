using Corretaje.Service.IServices.IVisita.IVisitaAgente;
using Corretaje.Service.Services.Visita.VisitaBase;

namespace Corretaje.Service.Services.Visita.VisitaAgente
{
    public class VisitaAgenteConfiguracion : VisitaConfiguracion, IVisitaAgenteConfiguracion
    {
        public VisitaAgenteConfiguracion()
        {
            EmailAsuntoVisitaCancelada = "Visita a propiedad cancelada";
            EmailAsuntoVisitaAgendada = "Visita a propiedad agendada";
            Emisor = "contacto@propins.cl";
        }
    }
}