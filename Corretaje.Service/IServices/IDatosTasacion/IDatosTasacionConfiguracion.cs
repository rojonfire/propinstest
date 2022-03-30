namespace Corretaje.Service.IServices.IDatosTasacion
{
    public interface IDatosTasacionConfiguracion
    {
        double FactorRangoInferiorSuperficieUtil { get; }

        double FactorRangoSuperiorSuperficieUtil { get; }

        double FactorRangoInferiorSuperficieTotal { get; }

        double FactorRangoSuperiorSuperficieTotal { get; } 
    }
}