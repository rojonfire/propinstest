using Corretaje.Service.IServices.ITasacion;

namespace Corretaje.Service.Services.Tasacion
{
    public class TasacionConfiguracion : ITasacionConfiguracion
    {
        public string TasacionUrl { get; set; }

        public string TokenBearer { get; set; }

        public double FactorValorMedia { get; set; }

        public double FactorValorMinimo { get; set; }

        public double FactorValorMaximo { get; set; }

        public double FactorValorMinimoFast { get; set; }

        public double FactorValorFast { get; set; }
        
    }
}