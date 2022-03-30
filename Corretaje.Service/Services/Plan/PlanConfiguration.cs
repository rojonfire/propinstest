using Corretaje.Service.IServices.IPlan;

namespace Corretaje.Service.Services.Plan
{
    public class PlanConfiguration : IPlanConfiguration
    {
        public int CantidadDePlanes { get; set; }

        public string EMailAdmin { get; set; }

        public string EMailSubject { get; set; }

        public string FromAddress { get; set; }
    }
}
