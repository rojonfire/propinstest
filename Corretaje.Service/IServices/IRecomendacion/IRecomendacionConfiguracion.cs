namespace Corretaje.Service.IServices.IRecomendacion
{
    public interface IRecomendacionConfiguracion
    {
        string EmailAsunto { get; }
        string EmailEmisor { get; }
        string PropiedadLinkDomain { get; }
    }
}
