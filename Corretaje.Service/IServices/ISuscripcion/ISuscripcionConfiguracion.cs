namespace Corretaje.Service.IServices.ISuscripcion
{
    public interface ISuscripcionConfiguracion
    {
        string EmailAsunto { get; }

        string EmailEmisor { get; }

        string EmailContenido { get; }

        string BaseUrl { get; }

        int SumaEstacionamientos { get; }

        double FactorSuperficieInferior { get; }

        double FactorSuperficieSuperior { get; }
    }
}
