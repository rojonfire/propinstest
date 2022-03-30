using Corretaje.Common.EMail;
using Corretaje.Service.IServices.IVisita.IVisitaVirtual;
using Corretaje.Service.Services.Visita.VisitaBase;

namespace Corretaje.Service.Services.Visita.VisitaVirtual
{
    public class VisitaVirtualEmail : VisitaEmail, IVisitaVirtualEmail
    {
        public VisitaVirtualEmail(
            IEMailService emailService,
            IVisitaVirtualConfiguracion visitaVirtualConfiguracion) : base(emailService, visitaVirtualConfiguracion)
        {

        }
    }
}
