using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Plan;
using Corretaje.Api.Dto.ServicioBase;
using Corretaje.Domain;
using Corretaje.Service.IServices.IPlan;
using Corretaje.Service.IServices.IServicio;
using Corretaje.Service.IServices.IUsuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ServicioBaseController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IPlanService _planService;
        private readonly IPlanesYServiciosHelper _planesYServiciosHelper;
        private readonly IResponseHelper _responseHelper;
        private readonly IServicioService<ServicioBase> _servicioBaseService;
        private readonly IUsuarioService _usuarioService;

        public ServicioBaseController(IMapper mapper, IPlanService planService, IPlanesYServiciosHelper planesYServiciosHelper, IResponseHelper responseHelper, 
            IServicioService<ServicioBase> servicioBaseService, IUsuarioService usuarioService)
        {
            _mapper = mapper;
            _planService = planService;
            _planesYServiciosHelper = planesYServiciosHelper;
            _responseHelper = responseHelper;
            _servicioBaseService = servicioBaseService;
            _usuarioService = usuarioService;
        }

        [HttpPost("AgregarServicioBase")]
        [ProducesResponseType(201, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgregarServicioBase(AgregarServicioBaseDto servicioBase)
        {
            var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUserClaims.Name;

            var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

            if (loggedUser == null)
            {
                return Unauthorized();
            }

            if (loggedUser.TipoCuenta != Estados.TipoCuenta.Administrador)
            {
                return Forbid();
            }

            var servicioBaseParaAgregar = _mapper.Map<ServicioBase>(servicioBase);

            var respuestaDelServicio = await _servicioBaseService.AgregarServicio(servicioBaseParaAgregar);

            var servicioBaseAgregado = _mapper.Map<ServicioBaseDto>(respuestaDelServicio);

            return CreatedAtAction(nameof(GetServicioBaseById), new { servicioBaseId = servicioBaseAgregado.Id }, _responseHelper.ReturnOkResponse(servicioBaseAgregado));
        }

        [HttpPost("AgregarColeccionDeServiciosBase")]
        [ProducesResponseType(201, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgregarColeccionDeServiciosBase(IEnumerable<AgregarServicioBaseDto> serviciosBase)
        {
            var serviciosBaseParaAgregar = _mapper.Map<IEnumerable<ServicioBase>>(serviciosBase);

            var respuestaDelServicio = await _servicioBaseService.AgregarServicios(serviciosBaseParaAgregar);

            var serviciosBaseAgregados = _mapper.Map<IEnumerable<ServicioBaseDto>>(respuestaDelServicio);

            return CreatedAtAction(nameof(GetTodosLosServiciosBase), _responseHelper.ReturnOkResponse(serviciosBaseAgregados));
        }

        [HttpGet("GetServicioBaseById")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetServicioBaseById(string servicioBaseId)
        {
            if (string.IsNullOrWhiteSpace(servicioBaseId))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(servicioBaseId))));
            }

            var respuestaDelServicio = await _servicioBaseService.GetServicioById(new ObjectId(servicioBaseId));

            var servicioBase = _mapper.Map<ServicioBaseDto>(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(servicioBase)));
        }

        [HttpGet("GetTodosLosServiciosBase")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetTodosLosServiciosBase()
        {
            var respuestaDelServicio = await _servicioBaseService.GetTodosLosServicios();

            var serviciosBase = _mapper.Map<IEnumerable<ServicioBaseDto>>(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(serviciosBase)));
        }

        [AllowAnonymous]
        [HttpGet("GetTodosLosServiciosBaseParaProcesoDeCompra")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetTodosLosServiciosBaseParaProcesoDeCompra()
        {
            var respuestaDelServicioPlanes = await _planService.GetTodosLosPlanes();

            var respuestaDelServicioServiciosBase = await _servicioBaseService.GetTodosLosServicios();

            var serviciosBase = _mapper.Map<IEnumerable<ServicioBaseFormateadoParaVistaDto>>(respuestaDelServicioServiciosBase);

            var planes = _mapper.Map<IEnumerable<PlanConServicioBaseFormateadoParaVistaDto>>(respuestaDelServicioPlanes);

            var planesYServicios = _planesYServiciosHelper.DarFormatoPlanesYServicios(serviciosBase, planes);

            return Ok(Json(_responseHelper.ReturnOkResponse(planesYServicios)));
        }

        [HttpPost("DeleteServicioBaseById")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public IActionResult DeleteServicioBaseById(string servicioBaseId)
        {
            if (string.IsNullOrWhiteSpace(servicioBaseId))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(servicioBaseId))));
            }

            _servicioBaseService.DeleteServicio(new ObjectId(servicioBaseId));

            return NoContent();
        }

        [HttpGet("UpdateServicioBase")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UpdateServicioBase(ServicioBaseDto servicioBase)
        {
            if (servicioBase == null)
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponse()));
            }

            var servicioBaseParaActualizar = _mapper.Map<ServicioBase>(servicioBase);

            var respuestaDelServicio = await _servicioBaseService.UpdateServicio(servicioBaseParaActualizar);

            var servicioBaseActualizado = _mapper.Map<ServicioBaseDto>(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(servicioBaseActualizado)));
        }
    }
}