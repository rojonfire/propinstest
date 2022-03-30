namespace Corretaje.Service.IServices.ITasacion
{
    public interface ITasacionConfiguracion
    {
        string TokenBearer { get; }

        string TasacionUrl { get; }

        double FactorValorMedia { get; }

        double FactorValorMinimo { get; }

        double FactorValorMaximo { get; }

        double FactorValorMinimoFast { get; }

        double FactorValorFast { get; }
    }
}