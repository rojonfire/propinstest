using Corretaje.Service.IServices.IProvider;

namespace Corretaje.Service.Services.Provider
{
    public class LiveConfiguracion : ILiveConfiguracion
    {
        public string UrlLive { get; set; }
    }
}
