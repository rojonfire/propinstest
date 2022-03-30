using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Suscripcion;
using Corretaje.Domain;
using Corretaje.Service.IServices.IPropiedad;
using Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPIInmobiliaria;
using Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPINatural;
using Corretaje.Service.IServices.ISuscripcion;
using Corretaje.Service.IServices.IUsuario;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;

namespace Corretaje.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuscripcionController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IResponseHelper _responseHelper;
        private readonly ISuscripcionService _suscripcionService;
        private readonly IPIPropiedadInmobiliariaService _propiedadInmobiliariaService;
        private readonly IPIPropiedadNaturalService _propiedadNaturalService;
        private readonly IUsuarioService _usuarioService;
        private readonly IPropiedadService _propiedadService;

        public SuscripcionController(IMapper mapper, IResponseHelper responseHelper, ISuscripcionService suscripcionService,
            IPIPropiedadInmobiliariaService propiedadInmobiliariaService, IPIPropiedadNaturalService propiedadNaturalService, IUsuarioService usuarioService,
            IPropiedadService propiedadService)
        {
            _mapper = mapper;
            _responseHelper = responseHelper;
            _suscripcionService = suscripcionService;
            _propiedadInmobiliariaService = propiedadInmobiliariaService;
            _propiedadNaturalService = propiedadNaturalService;
            _usuarioService = usuarioService;
            _propiedadService = propiedadService;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Suscripcion))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id))));
            }
            var suscripcion = await _suscripcionService.Get(new ObjectId(id));

            if (suscripcion == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            return Ok(Json(_responseHelper.ReturnOkResponse(suscripcion, "Se han encontrado resultados para su busqueda")));
        }

        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Add(SuscripcionCrearEditarDto suscripcion)
        {
            var suscripcionToAdd = _mapper.Map<Suscripcion>(suscripcion);

            var usuarioExiste = await _usuarioService.GetByEmail(suscripcionToAdd.EmailUsuario);
            if (usuarioExiste != null)
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse("El email del contacto ya está ingresado en nuestro sistema"));
            }

            var loggedUser = HttpContext.User.Identity as ClaimsIdentity;
            if (loggedUser != null && loggedUser.Name != null)
            {
                string userId = loggedUser.Name;

                var user = await _usuarioService.Get(new ObjectId(userId));
                if (user != null)
                {
                    suscripcionToAdd.IdUsuario = userId;
                }
            }
            
            var resultado = await _suscripcionService.Add(suscripcionToAdd);

            var suscripcionAdded = _mapper.Map<SuscripcionDto>(resultado);

            await _suscripcionService.UpdateRecomendaciones();

            return Ok(_responseHelper.ReturnOkResponse(suscripcionAdded, "Se ha agregado la suscripción exitosamente"));
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Update(string id, SuscripcionCrearEditarDto suscripcion)
        {
            var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUserClaims.Name;

            var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

            if (loggedUser == null)
            {
                return Unauthorized();
            }

            if (loggedUser.TipoCuenta != Estados.TipoCuenta.Administrador &&
                loggedUser.TipoCuenta != Estados.TipoCuenta.JefeDeVentas &&
                loggedUser.TipoCuenta != Estados.TipoCuenta.Broker)
            {
                return Forbid();
            }

            if (string.IsNullOrWhiteSpace(id))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id))));
            }
            var suscripcionToUpdate = _mapper.Map<Suscripcion>(suscripcion);
            
            var suscripcionOld = await _suscripcionService.Get(new ObjectId(id));

            if (suscripcionOld == null)
            {
                return BadRequest(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            suscripcionToUpdate.Id = new ObjectId(id);
            suscripcionToUpdate.IdUsuario = suscripcionOld.IdUsuario;
            suscripcionToUpdate.CreatedAt = suscripcionOld.CreatedAt;
            suscripcionToUpdate.Version = suscripcionOld.Version;

            var resultado = await _suscripcionService.Update(suscripcionToUpdate);

            var suscripcionUpdated = _mapper.Map<SuscripcionDto>(resultado);

            await _suscripcionService.UpdateRecomendaciones();

            return Ok(Json(_responseHelper.ReturnOkResponse(suscripcionUpdated)));
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get(int pageSize = 10, int page = 1)
        {
            var suscripcionesPaginadas = await _suscripcionService.GetAllPaginated(pageSize, page);
            return Ok(Json(_responseHelper.ReturnOkResponse(suscripcionesPaginadas, "Se han encontrado resultados para su busqueda")));
        }
        
        [HttpPost("BuscarCoincidencias")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> BuscarCoincidencias(SuscripcionDto suscripcionDto)
        {
            var suscripcion = _mapper.Map<Suscripcion>(suscripcionDto);

            var propiedadesInmobiliarias = await _propiedadInmobiliariaService.BuscarCoincidencias(suscripcion);

            return Ok(Json(_responseHelper.ReturnOkResponse(propiedadesInmobiliarias)));
        }

        [HttpGet("BuscarCoincidenciasById")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> BuscarCoincidenciasById(string id)
        {
            string IDDD = id;
            var suscripcion = await _suscripcionService.Get(new ObjectId(id));

            var propiedadesInmobiliarias = await _propiedadService.BuscarCoincidencias(suscripcion, 0.9, 1.1, 1, Estados.EstadoPropiedad.PropiedadPublicada);

            return Ok(Json(_responseHelper.ReturnOkResponse(propiedadesInmobiliarias)));
        }

        [HttpGet("BuscarCoincidenciasAll")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> BuscarCoincidenciasAll()
        {
            var suscripcionesActualizadas = await _suscripcionService.UpdateRecomendaciones();

            return Ok(Json(_responseHelper.ReturnOkResponse(suscripcionesActualizadas)));
        }

        [HttpGet("Export")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Exportar()
        {
            DateTime now = new DateTime();
            var fileName = $"Match Suscripciones {now}.xlsx";
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), fileName);

            var excelStream = await _suscripcionService.Export(filePath);
            //excelStream.Position = 0;

            return File(excelStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }

        [HttpGet("LastUpdate")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetLastUpdate()
        {
            var suscripcion = await _suscripcionService.GetLastUpdated();
            return Ok(Json(_responseHelper.ReturnOkResponse(suscripcion)));
        }

        [HttpPut("UpdateAll")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> ActualizarConTipoVenta()
        {
            var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUserClaims.Name;

            var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

            if (loggedUser == null)
            {
                return Unauthorized();
            }

            if (loggedUser.TipoCuenta != Estados.TipoCuenta.Administrador &&
                loggedUser.TipoCuenta != Estados.TipoCuenta.JefeDeVentas &&
                loggedUser.TipoCuenta != Estados.TipoCuenta.Broker)
            {
                return Forbid();
            }

            var suscripciones = await _suscripcionService.GetAll();
            int i = 0;
            if (suscripciones != null && suscripciones.Count() > 0)
            {
                foreach(var sus in suscripciones)
                {
                    sus.EsVenta = true;
                    await _suscripcionService.Update(sus);
                    i++;
                }
            }
            return Ok(_responseHelper.ReturnOkResponse(null, $"${i} suscripciones actualizadas"));
        }
    }
}