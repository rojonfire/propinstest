using AutoMapper;
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
    public class OperacionController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IOperacionService _operacionService;
        private readonly IResponseHelper _responseHelper;

        public OperacionController(IMapper mapper, IOperacionService operacionService, IResponseHelper responseHelper)
        {
            _mapper = mapper;
            _operacionService = operacionService;
            _responseHelper = responseHelper;
        }

        [HttpPost("InsertIOperacion")]
        [ProducesResponseType(201, Type = typeof(Operacion))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        public async Task<IActionResult> Post(Operacion operacion)
        {
            if (!ModelState.IsValid) return BadRequest();
            await _operacionService.Insert(operacion);
            return Json(new { id = operacion.Id, Estado = 1 });
        }

        [HttpGet("GetsOperacion")]
        [ProducesResponseType(201, Type = typeof(List<Operacion>))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        public async Task<IActionResult> Gets()
        {
            var operaciones = await _operacionService.GetAll();

            operaciones = operaciones.Where(operacion => !operacion.Delete);

            return Json(operaciones);
        }

        [HttpPut("UpdateOperacion")]
        [ProducesResponseType(201, Type = typeof(Operacion))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        public async Task<IActionResult> UpdateOperacion(Operacion operacion)
        {
            operacion.Id = ObjectId.Parse(operacion.IdString);
            await _operacionService.Update(operacion);
            return Json(new { Mensaje = "Elemento Actualizado", Estado = 1 });
        }

        [HttpDelete("DeleteOperacion/{id}")]
        [ProducesResponseType(200, Type = typeof(Operacion))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        public async Task<IActionResult> DeleteOperacion([FromRoute] string id)
        {
            if (!ModelState.IsValid) return BadRequest();

            var operaciones = await _operacionService.GetAll();

            if (operaciones.IsNullOrEmpty())
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var operacion = operaciones.FirstOrDefault(x => x.Id.ToString() == id);

            if (operacion == null) return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            operacion.Delete = true;
            await _operacionService.Update(operacion);
            return Ok(new { Mensaje = "Elemento Eliminado", Estado = 1 });
        }

        [HttpPost("BusquedaOperacion")]
        [ProducesResponseType(201, Type = typeof(List<Contrato>))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        public async Task<IActionResult> PostBusquedaOperacion(OperacionDto operacionDto)
        {
            if (operacionDto.IdPropiedad == null && operacionDto.Plan == null &&
                operacionDto.ServiciosAdicionales == null && operacionDto.Tipo == null) return BadRequest("Datos nulos");
            var operacion = _mapper.Map<Operacion>(operacionDto);
            var operaciones = await _operacionService.BusquedaOperacion(operacion);
            return Json(operaciones);
        }
    }
}