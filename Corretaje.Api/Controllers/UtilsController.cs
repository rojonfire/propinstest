using Corretaje.Domain;
using Corretaje.Service.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UtilsController : Controller
    {
        private readonly IRegionesService _regionService;
        public UtilsController(IRegionesService regionService)
        {
            _regionService = regionService;
        }

        [HttpGet("GetRegiones")]
        [ProducesResponseType(200, Type = typeof(List<Regiones>))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetRegiones()
        {
            var regiones = await _regionService.GetAll();
            return Json(regiones);
        }
    }
}