using Corretaje.Service.IServices.IVisita.IVisitaBase;

namespace Corretaje.Service.IServices.IVisita.IVisitaUsuario
{
    public interface IVisitaUsuarioConfiguracion : IVisitaConfiguracion
    {
        string EmailAsuntoAnfitrionAsiste { get; }
    }
}
