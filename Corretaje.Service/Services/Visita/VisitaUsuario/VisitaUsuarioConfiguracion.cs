using Corretaje.Service.IServices.IVisita.IVisitaUsuario;
using Corretaje.Service.Services.Visita.VisitaBase;

namespace Corretaje.Service.Services.Visita.VisitaUsuario
{
    public class VisitaUsuarioConfiguracion : VisitaConfiguracion, IVisitaUsuarioConfiguracion
    {
        public string EmailAsuntoAnfitrionAsiste { get; set; }
    }
}
