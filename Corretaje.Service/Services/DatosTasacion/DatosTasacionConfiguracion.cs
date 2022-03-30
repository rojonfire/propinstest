using Corretaje.Service.IServices.IDatosTasacion;

namespace Corretaje.Service.Services.DatosTasacion
{
    public class DatosTasacionConfiguracion : IDatosTasacionConfiguracion
    {
        public double FactorRangoInferiorSuperficieUtil { get; set; }

        public double FactorRangoSuperiorSuperficieUtil { get; set; }

        public double FactorRangoInferiorSuperficieTotal { get; set; }

        public double FactorRangoSuperiorSuperficieTotal { get; set; }
    }
}