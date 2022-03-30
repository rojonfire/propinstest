namespace Corretaje.Service.IServices.IVisita.IVisitaBase
{
    public interface IVisitaConfiguracion
    {
        string Emisor { get; }

        string EmailAsuntoVisitaAgendada { get; }

        string EmailAsuntoVisitaCancelada { get; }
    }
}
