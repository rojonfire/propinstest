using Corretaje.Domain;
using Corretaje.Service.IServices.ISBIF;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SBIFController : Controller
    {
        private readonly ISBIFService _sBIFService;

        public SBIFController(ISBIFService sBIFService)
        {
            _sBIFService = sBIFService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(Uf))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get()
        {
            var uf = await _sBIFService.GetLastUf();

            if (uf == null)
            {
                return NotFound();
            }
            
            return Ok(Json(uf));
        }
    }
}
