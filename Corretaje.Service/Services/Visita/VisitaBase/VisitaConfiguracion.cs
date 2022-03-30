using Corretaje.Service.IServices.IVisita.IVisitaBase;

namespace Corretaje.Service.Services.Visita.VisitaBase
{
    public abstract class VisitaConfiguracion : IVisitaConfiguracion
    {
        public string Emisor { get; set; }

        public string EmailAsuntoVisitaAgendada { get; set; }

        public string EmailAsuntoVisitaCancelada { get; set; }
    }
}
