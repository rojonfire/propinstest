using Corretaje.Common.EMail;
using Corretaje.Service.IServices.IVisita.IVisitaAgente;
using Corretaje.Service.Services.Visita.VisitaBase;

namespace Corretaje.Service.Services.Visita.VisitaAgente
{
    public class VisitaAgenteEmail : VisitaEmail, IVisitaAgenteEmail
    {
        public VisitaAgenteEmail(
            IEMailService emailService,
            IVisitaAgenteConfiguracion visitaAgenteConfiguracion) : base(emailService, visitaAgenteConfiguracion)
        {

        }
    }
}