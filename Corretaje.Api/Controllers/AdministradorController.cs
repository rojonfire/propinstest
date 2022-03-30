using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Commons.SecurityHelper;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Usuario;
using Corretaje.Common.Extension;
using Corretaje.Domain;
using Corretaje.Service.IServices.IRecomendacion;
using Corretaje.Service.IServices.IUsuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class AdministradorController : Controller
    {
        private readonly IEncriptacionHelper _encriptacionHelper;
        private readonly IMapper _mapper;
        private readonly IResponseHelper _responseHelper;
        private readonly IUsuarioService _usuarioService;

        public AdministradorController(IEncriptacionHelper encriptacionHelper, IMapper mapper, IResponseHelper responseHelper, IUsuarioService usuarioService)
        {
            _encriptacionHelper = encriptacionHelper;
            _mapper = mapper;
            _responseHelper = responseHelper;
            _usuarioService = usuarioService;
        }

        [HttpPut]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Actualizar(AdministradorDto administrador)
        {
            var administradorParaActualizar = _mapper.Map<Usuario>(administrador);

            var respuestaServicio = await _usuarioService.Update(administradorParaActualizar);

            var administradorActualizado = _mapper.Map<AdministradorDto>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(administradorActualizado, "Administrador actualizado")));
        }

        [HttpPost("Eliminar")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public IActionResult Eliminar(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id))));
            }

            _usuarioService.Eliminar(new ObjectId(id));

            return Ok(Json(_responseHelper.ReturnOkResponse(null, "Administrador eliminado")));
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get()
        {
            var administradoresBusqueda = await _usuarioService.GetAdministradores();

            if (administradoresBusqueda.IsNullOrEmpty())
            {
                return Json(_responseHelper.ReturnNotFoundResponse());
            }

            var administradoresEncontrados = _mapper.Map<IEnumerable<AdministradorDto>>(administradoresBusqueda);

            return Ok(Json(_responseHelper.ReturnOkResponse(administradoresEncontrados)));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id))));
            }

            var administradorBusqueda = await _usuarioService.Get(new ObjectId(id));

            if (administradorBusqueda == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var administradorEncontrado = _mapper.Map<AdministradorDto>(administradorBusqueda);

            return Ok(Json(_responseHelper.ReturnOkResponse(administradorEncontrado)));
        }

        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Post(AdministradorAgregarDto administrador)
        {
            administrador.Password = _encriptacionHelper.GenerarMd5Hash(administrador.Password);

            var administradorParaAgregar = _mapper.Map<Usuario>(administrador);

            var validacion = await _usuarioService.Validar(administradorParaAgregar);

            if (validacion.Estado == Estados.Respuesta.Error)
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponse(validacion.Mensaje)));
            }

            var respuestaServicio = await _usuarioService.AddAdministrador(administradorParaAgregar);

            var administradorAgregado = _mapper.Map<AdministradorDto>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(administradorAgregado, "Administrador agregado")));
        }

        /*
        [AllowAnonymous]
        [HttpPost("EnviarRecomendaciones")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public string EnviarRecomendaciones()
        {
            _recomendacionService.EnviarRecomendaciones();

            return "fin";
        }
        */
    }
}
