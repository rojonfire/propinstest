using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Common.Extension;
using Corretaje.Domain;
using Corretaje.Service.IServices.IPlan;
using Corretaje.Service.IServices.IServicio;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Corretaje.Service.IServices.IUsuario;
using System.Security.Claims;

namespace Corretaje.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ServicioAdicionalController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IResponseHelper _responseHelper;
        private readonly IServicioService<ServicioAdicional> _servicioAdicionalService;
        private readonly IPlanService _planService;
        private readonly IUsuarioService _usuarioService;

        public ServicioAdicionalController(IMapper mapper, IResponseHelper responseHelper, IServicioService<ServicioAdicional> servicioAdicionalService,
            IPlanService planService, IUsuarioService usuarioService)
        {
            _mapper = mapper;
            _responseHelper = responseHelper;
            _servicioAdicionalService = servicioAdicionalService;
            _planService = planService;
            _usuarioService = usuarioService;
        }

        [HttpPost("AgregarServicioAdicional")]
        [ProducesResponseType(201, Type = typeof(ServicioAdicionalDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgregarServicioAdicional(ServicioAdicionalDto servicioAdicional)
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

            if (!ModelState.IsValid)
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse());
            }

            var servicioAdicionalParaAgregar = _mapper.Map<ServicioAdicional>(servicioAdicional);

            var respuestaDelServicio = await _servicioAdicionalService.AgregarServicio(servicioAdicionalParaAgregar);

            var servicioAdicionalAgregado = _mapper.Map<ServicioAdicionalDto>(respuestaDelServicio);

            return CreatedAtAction(nameof(GetServicioAdicionalById), new { servicioAdicionalId = servicioAdicionalAgregado.Id }, _responseHelper.ReturnOkResponse(servicioAdicionalAgregado));
        }

        [HttpPost("AgregarServiciosAdicionales")]
        [ProducesResponseType(201, Type = typeof(ServicioAdicionalDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgregarServiciosAdicionales(IEnumerable<ServicioAdicionalDto> serviciosAdicionales)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse());
            }

            var serviciosAdicionalesParaAgregar = _mapper.Map<IEnumerable<ServicioAdicional>>(serviciosAdicionales);

            var respuestaDelServicio = await _servicioAdicionalService.AgregarServicios(serviciosAdicionalesParaAgregar);

            var serviciosAdicionalAgregados = _mapper.Map<IEnumerable<ServicioAdicionalDto>>(respuestaDelServicio);

            return CreatedAtAction(nameof(GetAllServiciosAdicionales), _responseHelper.ReturnOkResponse(serviciosAdicionalAgregados));
        }

        [HttpGet("GetServicioAdicionalById")]
        [ProducesResponseType(200, Type = typeof(ServicioAdicionalDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetServicioAdicionalById(string servicioAdicionalId)
        {
            if (string.IsNullOrWhiteSpace(servicioAdicionalId))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(servicioAdicionalId))));
            }

            var respuestaDelServicio = await _servicioAdicionalService.GetServicioById(new ObjectId(servicioAdicionalId));

            if (respuestaDelServicio == null)
            {
                return NotFound(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var servicioAdicional = _mapper.Map<ServicioAdicionalDto>(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(servicioAdicional)));
        }

        [AllowAnonymous]
        [HttpGet("GetAllServiciosAdicionales")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ServicioAdicionalDto>))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetAllServiciosAdicionales()
        {
            var respuestaDelServicio = await _servicioAdicionalService.GetTodosLosServicios();

            if (respuestaDelServicio.IsNullOrEmpty())
            {
                return NotFound(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var serviciosAdicionales = _mapper.Map<IEnumerable<ServicioAdicionalDto>>(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(serviciosAdicionales)));
        }

        [HttpDelete("DeleteServicioAdicionalById")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> DeleteServicioAdicionalById(string servicioAdicionalId)
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

            if (string.IsNullOrWhiteSpace(servicioAdicionalId))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(servicioAdicionalId)));
            }

            await _servicioAdicionalService.DeleteServicio(new ObjectId(servicioAdicionalId));

            return Ok(_responseHelper.ReturnOkResponse("Se ha eliminado el servicio exitosamente"));
        }

        [HttpPut("UpdateServicioAdicional")]
        [ProducesResponseType(200, Type = typeof(ServicioAdicionalDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UpdateServicioAdicional(ServicioAdicionalDto servicioAdicional)
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

            if (servicioAdicional == null)
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse());
            }

            var servicioAdicionalParaActualizar = _mapper.Map<ServicioAdicional>(servicioAdicional);

            var respuestaDelServicio = await _servicioAdicionalService.UpdateServicio(servicioAdicionalParaActualizar);

            var servicioAdicionalActualizado = _mapper.Map<ServicioAdicionalDto>(respuestaDelServicio);

            return Ok(_responseHelper.ReturnOkResponse(servicioAdicionalActualizado));
        }

        [HttpGet("GetServiciosAdicionalesByPlanId")]
        [ProducesResponseType(200, Type = typeof(ServicioAdicionalDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetServiciosAdicionalesByPlanId(string planId)
        {
            if (planId == null)
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponse()));
            }

            var plan = await _planService.GetPlanById(new ObjectId(planId));

            if (plan.ServiciosAdicionales != null && plan.ServiciosAdicionales.Count > 0)
            {
                HashSet<ObjectId> arrayServiciosId = new HashSet<ObjectId>(plan.ServiciosAdicionales.Select(s => s.Id));
                IEnumerable<ServicioAdicional> allServiciosAdicionales = await _servicioAdicionalService.GetTodosLosServicios();
                var serviciosAdicionales = allServiciosAdicionales.Where(s => arrayServiciosId.Contains(s.Id));
                return Ok(Json(_responseHelper.ReturnOkResponse(serviciosAdicionales)));

            }
            else
            {
                return NotFound(Json(_responseHelper.ReturnNotFoundResponse()));
            }
            

        }


    }
}