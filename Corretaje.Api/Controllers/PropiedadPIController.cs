using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.PropiedadPI;
using Corretaje.Domain;
using Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPIArriendo;
using Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPIInmobiliaria;
using Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPINatural;
using Corretaje.Service.IServices.ISuscripcion;
using Corretaje.Service.IServices.IUsuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Corretaje.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PropiedadPIController : Controller
    {
        private readonly IPIPropiedadInmobiliariaService _propiedadInmobiliariaService;
        private readonly IPIPropiedadNaturalService _propiedadNaturalService;
        private readonly IPIPropiedadArriendoService _propiedadArriendoService;
        private readonly IMapper _mapper;
        private readonly IResponseHelper _responseHelper;
        private readonly IMapHelper _mapHelper;
        private readonly ISuscripcionService _suscripcionService;
        private readonly IUsuarioService _usuarioService;

        public PropiedadPIController(IPIPropiedadInmobiliariaService propiedadInmobiliariaService, IPIPropiedadNaturalService propiedadNaturalService,
            IPIPropiedadArriendoService propiedadArriendoService, IMapper mapper, IResponseHelper responseHelper, IMapHelper mapHelper, 
            ISuscripcionService suscripcionService, IUsuarioService usuarioService)
        {
            _propiedadInmobiliariaService = propiedadInmobiliariaService;
            _propiedadNaturalService = propiedadNaturalService;
            _propiedadArriendoService = propiedadArriendoService;
            _mapper = mapper;
            _responseHelper = responseHelper;
            _mapHelper = mapHelper;
            _suscripcionService = suscripcionService;
            _usuarioService = usuarioService;
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgregarPropiedadPI(PropiedadPIDto propiedadPIDto)
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

            if (propiedadPIDto.Tipo == "natural")
            {
                var propiedad = _mapHelper.MapPropiedadPIANatural(propiedadPIDto);
                var propiedadAgregada = await _propiedadNaturalService.Add(propiedad);
                await _suscripcionService.UpdateRecomendaciones();
                return Ok(Json(_responseHelper.ReturnOkResponse(propiedad, "Elemento Ingresado")));
            }
            else if (propiedadPIDto.Tipo == "inmobiliaria")
            {
                var propiedad = _mapHelper.MapPropiedadPIAInmobiliaria(propiedadPIDto);
                var propiedadAgregada = await _propiedadInmobiliariaService.Add(propiedad);
                await _suscripcionService.UpdateRecomendaciones();
                return Ok(Json(_responseHelper.ReturnOkResponse(propiedadAgregada, "Elemento Ingresado")));
            } else
            {
                var propiedad = _mapHelper.MapPropiedadPIAArriendo(propiedadPIDto);
                var propiedadAgregada = await _propiedadArriendoService.Add(propiedad);
                await _suscripcionService.UpdateRecomendaciones();
                return Ok(Json(_responseHelper.ReturnOkResponse(propiedadAgregada, "Elemento Ingresado")));
            }

        }

        [HttpPost("Upload/{tipo}")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UploadTasacion(string tipo, IFormFile file)
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

            if (file == null || file.Length == 0)
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse("Archivo invalido"));
            }

            string fileExtension = Path.GetExtension(file.FileName);
            if (fileExtension != ".xls" && fileExtension != ".xlsx")
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse("Solo se admiten archivos con formato .xlsx"));

            }

            var fileName = file.FileName;
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), fileName);
            var fileLocation = new FileInfo(filePath);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            if (file.Length <= 0)
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse("Archivo no encontrado"));
            }

            if (tipo == "natural")
            {
                var result = await _propiedadNaturalService.UploadFile(filePath);
                await _suscripcionService.UpdateRecomendaciones();
                return Ok(_responseHelper.ReturnOkResponse($"{result.Count()} Elementos Ingresados"));
            }
            else if (tipo == "inmobiliaria")
            {
                var result = await _propiedadInmobiliariaService.UploadFile(filePath);
                await _suscripcionService.UpdateRecomendaciones();
                return Ok(_responseHelper.ReturnOkResponse($"{result.Count()} Elementos Ingresados"));
            } else
            {
                var result = await _propiedadArriendoService.UploadFile(filePath);
                await _suscripcionService.UpdateRecomendaciones();
                return Ok(_responseHelper.ReturnOkResponse($"{result.Count()} Elementos Ingresados"));
            }

        }
    }
}