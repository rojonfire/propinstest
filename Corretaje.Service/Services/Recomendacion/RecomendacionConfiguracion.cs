using Corretaje.Service.IServices.IRecomendacion;

namespace Corretaje.Service.Services.Recomendacion
{
    public class RecomendacionConfiguracion : IRecomendacionConfiguracion
    {
        public string EmailAsunto { get; set; }

        public string EmailEmisor { get; set; }

        public string PropiedadLinkDomain { get; set; }
    }
}
