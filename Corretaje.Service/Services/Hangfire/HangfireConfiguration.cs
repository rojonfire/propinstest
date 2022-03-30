using Corretaje.Service.IServices.IHangfire;

namespace Corretaje.Service.Services.Hangfire
{
    public class HangfireConfiguration : IHangfireConfiguration
    {
        public string SqlConnection { get; set; }
    }
}
