using Corretaje.Api.Cron;
using Corretaje.Common.FTP;
using Corretaje.Service.Services;
using Corretaje.Service.Services.Propiedad;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortalInmobiliarioController : ControllerBase
    {
        private readonly IHostingEnvironment _environment;

        public PortalInmobiliarioController(IHostingEnvironment env)
        {
            _environment = env;
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
                .AddEnvironmentVariables();
            builder.Build();
        }

        [HttpGet("TestPubicacionPortal")]
        [ProducesResponseType(200, Type = typeof(JsonResult))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        public async Task<JsonResult> TestPubicacionPortalAsync()
        {
            var cnnString = "mongodb+srv://farellano:10DieKfzaWmM2jjN@cluster0corretaje-bgsks.azure.mongodb.net/test?retryWrites=true";
            var iPropiedadQuery = new PropiedadQueryFiltro();
            var delayedJob = new DelayedJobs(_environment,
                new PropiedadService(iPropiedadQuery, cnnString),
                new FtpService(),
                new PortalInmobiliarioService(cnnString));

            await delayedJob.PublicarPropiedadesFtp();

            return new JsonResult("OK");
        }
    }
}