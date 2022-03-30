using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Plan;
using Corretaje.Api.Dto.ServicioAdicional;
using Corretaje.Api.Dto.ServicioBase;
using Corretaje.Common.Extension;
using Corretaje.Domain;
using Corretaje.Service.IServices.IPlan;
using Corretaje.Service.IServices.IServicio;
using Corretaje.Service.IServices.IUsuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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
    [EnableCors("CorsPolicy")]
    public class PlanController : Controller
    {
        private readonly IMapHelper _mapHelper;
        private readonly IMapper _mapper;
        private readonly IPlanService _planService;
        private readonly IResponseHelper _responseHelper;
        private readonly IServicioService<ServicioAdicional> _servicioAdicionalService;
        private readonly IUsuarioService _usuarioService;

        public PlanController(IMapHelper mapHelper, IMapper mapper, IResponseHelper responseHelper, IPlanService servicioBaseService, 
            IServicioService<ServicioAdicional> servicioAdicionalService, IUsuarioService usuarioService)
        {
            _mapHelper = mapHelper;
            _mapper = mapper;
            _planService = servicioBaseService;
            _responseHelper = responseHelper;
            _servicioAdicionalService = servicioAdicionalService;
            _usuarioService = usuarioService;
        }

        [HttpPut("Actualizar")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Actualizar(PlanDto plan)
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

            var planParaActualizar = _mapHelper.MapPlanActualizar(plan);

            var respuestaDelServicio = await _planService.UpdatePlan(planParaActualizar);

            var planActualizado = _mapper.Map<PlanDto>(respuestaDelServicio);

            return Ok(_responseHelper.ReturnOkResponse(planActualizado));
        }

        [HttpPost("AgregarPlan")]
        [ProducesResponseType(201, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgregarPlan(AgregarPlanDto plan)
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

            var planParaAgregar = _mapHelper.MapAgregarPlanToPlan(plan);

            var respuestaDelServicio = await _planService.AgregarPlan(planParaAgregar);

            var respuesta = _mapper.Map<ResponseDto>(respuestaDelServicio);

            if (respuesta.Estado == Estados.Respuesta.Error)
            {
                return BadRequest(_responseHelper.ReturnValidationResponse(respuesta.Mensaje));
            }

            respuesta.Data = _mapHelper.MapPlanToPlan(respuestaDelServicio.Data);

            return CreatedAtAction(nameof(GetPlanById), new { planId = respuesta.Data.Id }, _responseHelper.ReturnOkResponse(respuesta.Data));
        }

        [HttpPut("AgregarServiciosBaseAPlan")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgregarServiciosBaseAPlan(string planId, IEnumerable<AgregarServicioBaseAPlanDto> serviciosBase)
        {
            if (string.IsNullOrWhiteSpace(planId))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(planId)));
            }

            if (serviciosBase.IsNullOrEmpty())
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse());
            }

            var serviciosParaAgregar = _mapHelper.Map(serviciosBase);

            var respuestaDelServicio = await _planService.AgregarListadoDeServiciosBase(new ObjectId(planId), serviciosParaAgregar);

            var plan = _mapper.Map<PlanDto>(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(plan)));
        }

        [HttpPut("AgregarServiciosAdicionalesAPlan")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgregarServiciosAdicionalesAPlan(string planId, IEnumerable<AgregarServicioAdicionalAPlanDto> serviciosAdicionales)
        {
            if (string.IsNullOrWhiteSpace(planId))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(planId)));
            }

            if (serviciosAdicionales.IsNullOrEmpty())
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse());
            }

            var idCollection = _mapHelper.MapToObjectId(serviciosAdicionales);

            var detalleServicios = await _servicioAdicionalService.GetServiciosAdicionalesById(idCollection);

            var respuestaDelServicio = await _planService.AgregarListadoDeServiciosAdicionales(new ObjectId(planId), detalleServicios);

            var plan = _mapper.Map<PlanDto>(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(plan)));
        }

        [HttpDelete("EliminarPlan")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> EliminarPlan(string planId)
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

            if (string.IsNullOrWhiteSpace(planId))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(planId)));
            }

            var resultadoDelServicio = await _planService.EliminarPlan(new ObjectId(planId));

            return Ok(_responseHelper.ReturnOkResponse(null, resultadoDelServicio.Mensaje));
        }

        [HttpPut("EliminarServicioBase")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> EliminarServicioBase(string planId, string servicioBaseId)
        {
            if (string.IsNullOrWhiteSpace(planId))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(planId)));
            }

            if (string.IsNullOrWhiteSpace(servicioBaseId))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(servicioBaseId)));
            }

            var respuestaDelServicio = await _planService.EliminarServicioBase(new ObjectId(planId), new ObjectId(servicioBaseId));

            var plan = _mapper.Map<PlanDto>(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(plan)));
        }

        [HttpGet("{planId}")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetPlanById(string planId)
        {
            if (string.IsNullOrWhiteSpace(planId))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(planId)));
            }

            var serviceResponse = await _planService.GetPlanById(new ObjectId(planId));

            if (serviceResponse == null)
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            var plan = _mapper.Map<PlanDto>(serviceResponse);

            return Ok(_responseHelper.ReturnOkResponse(plan));
        }

        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get()
        {
            var serviceResponse = await _planService.GetTodosLosPlanes();

            if (serviceResponse == null)
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            var planes = _mapper.Map<ICollection<PlanDto>>(serviceResponse);

            return Ok(_responseHelper.ReturnOkResponse(planes));
        }
    }
}
