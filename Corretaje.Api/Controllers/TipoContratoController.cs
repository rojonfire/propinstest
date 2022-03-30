using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Common.Extension;
using Corretaje.Domain;
using Corretaje.Service.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TipoContratoController : Controller
    {
        private readonly IResponseHelper _responseHelper;
        private readonly ITipoContratoService _tipoContratoService;

        public TipoContratoController(ITipoContratoService tipoContratoService, IResponseHelper responseHelper)
        {
            _responseHelper = responseHelper;
            _tipoContratoService = tipoContratoService;
        }

        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Post(TipoContrato tipoContrato)
        {
            if (!ModelState.IsValid) return BadRequest();
            await _tipoContratoService.Insert(tipoContrato);
            return Ok(Json(_responseHelper.ReturnOkResponse(null, "Elemento Ingresado")));
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<TipoContrato>))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get()
        {
            var tipoContratos = await _tipoContratoService.GetAll();

            if (tipoContratos.IsNullOrEmpty())
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            tipoContratos = tipoContratos.Where(tipoContrato => !tipoContrato.Delete);

            if (tipoContratos.IsNullOrEmpty())
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            return Json(tipoContratos);
        }

        [HttpPut]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Update(TipoContrato tipoContrato)
        {
            tipoContrato.Id = ObjectId.Parse(tipoContrato.IdString);
            await _tipoContratoService.Update(tipoContrato);
            return Ok(Json(_responseHelper.ReturnOkResponse(null, "Elemento Actualizado")));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200, Type = typeof(TipoContrato))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            if (!ModelState.IsValid) return BadRequest();

            var tipoContratos = await _tipoContratoService.GetAll();

            if (tipoContratos.IsNullOrEmpty())
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var tipoContrato = tipoContratos.FirstOrDefault(x => x.Id.ToString() == id);

            if (tipoContrato == null) Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            tipoContrato.Delete = true;
            await _tipoContratoService.Update(tipoContrato);
            return Ok(Json(_responseHelper.ReturnOkResponse(null, "Elemento Eliminado")));
        }
    }
}