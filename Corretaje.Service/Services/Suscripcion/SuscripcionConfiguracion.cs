using Corretaje.Service.IServices.ISuscripcion;

namespace Corretaje.Service.Services.Suscripcion
{
    public class SuscripcionConfiguracion : ISuscripcionConfiguracion
    {
        public string EmailAsunto { get; set; }

        public string EmailEmisor { get; set; }

        public string EmailContenido { get; set; }

        public string BaseUrl { get; set; }

        public int SumaEstacionamientos { get; set; }

        public double FactorSuperficieInferior { get; set; }

        public double FactorSuperficieSuperior { get; set; }
    }
}
