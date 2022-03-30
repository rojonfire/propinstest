using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Domain;
using Corretaje.Domain.Tasacion;
using Corretaje.Service.IServices.IDatosTasacion;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using System.Linq;
using Corretaje.Service.IServices.IUsuario;
using System.Security.Claims;
using MongoDB.Bson;
using Corretaje.Service.IServices.IDatosTasacion.IDatosTasacionArriendo;
using Corretaje.Service.IServices.IDatosTasacion.IDatosTasacionVenta;
using System;

namespace Corretaje.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DatosTasacionController : Controller
    {
        private readonly IDatosTasacionArriendoService _datosTasacionArriendoService;
        private readonly IDatosTasacionVentaService _datosTasacionVentaService;
        private readonly IResponseHelper _responseHelper;
        private readonly IMapper _mapper;
        private readonly IUsuarioService _usuarioService;

        public DatosTasacionController(IDatosTasacionArriendoService datosTasacionArriendoService, 
            IDatosTasacionVentaService datosTasacionVentaService, 
            IResponseHelper responseHelper, IMapper mapper, IUsuarioService usuarioService)
        {
            _datosTasacionArriendoService = datosTasacionArriendoService;
            _datosTasacionVentaService = datosTasacionVentaService;
            _responseHelper = responseHelper;
            _mapper = mapper;
            _usuarioService = usuarioService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get(string tipo)
        {
            if (tipo == "arriendo")
            {
                var datos = await _datosTasacionVentaService.GetAll();
                return Ok(_responseHelper.ReturnOkResponse(datos, "Datos tasacion encontrados"));
            } else
            {
                var datos = await _datosTasacionArriendoService.GetAll();
                return Ok(_responseHelper.ReturnOkResponse(datos, "Datos tasacion encontrados"));
            }

        }

        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Post(DatosTasacion datosTasacion, string tipo = "venta")
        {
            var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUserClaims.Name;

            var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

            if (loggedUser == null)
            {
                return Unauthorized();
            }

            if (loggedUser.TipoCuenta != Estados.TipoCuenta.Administrador ||
                loggedUser.TipoCuenta != Estados.TipoCuenta.JefeDeVentas ||
                loggedUser.TipoCuenta != Estados.TipoCuenta.Broker)
            {
                return Forbid();
            }

            if (tipo == "arriendo")
            {
                DatosTasacionArriendo datosTasacionArriendo = _mapper.Map<DatosTasacionArriendo>(datosTasacion);
                var datosTasacionAgregado = await _datosTasacionArriendoService.Add(datosTasacionArriendo);
                return Ok(_responseHelper.ReturnOkResponse(datosTasacionAgregado, "Elemento Ingresado"));
            }
            else
            {
                DatosTasacionVenta datosTasacionVenta = _mapper.Map<DatosTasacionVenta>(datosTasacion);
                var datosTasacionAgregado = await _datosTasacionVentaService.Add(datosTasacionVenta);
                return Ok(_responseHelper.ReturnOkResponse(datosTasacionAgregado, "Elemento Ingresado"));
            }
        }

        [HttpPost("GetPropiedadesSimilares")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetPropiedadesSimilares(TasacionPropiedad datosTasacion, int pageSize = 5, int page = 1, string tipo = "venta")
        {
            if (tipo == "arriendo")
            {
                var propiedadesSimilares = await _datosTasacionArriendoService.GetPropiedadesSimilares(datosTasacion, pageSize, page);
                return Ok(_responseHelper.ReturnOkResponse(propiedadesSimilares, "Se han encontrado resultados para su búsqueda"));
            }
            else
            {
                var propiedadesSimilares = await _datosTasacionVentaService.GetPropiedadesSimilares(datosTasacion, pageSize, page);
                return Ok(_responseHelper.ReturnOkResponse(propiedadesSimilares, "Se han encontrado resultados para su búsqueda"));
            }
            
            
        }

        [HttpPost("GetValoresPreliminares")]
        [AllowAnonymous]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetValoresPreliminaresTasacion(TasacionPropiedad datosTasacion, string tipo = "venta")
        {
            try
            {
                if (tipo == "arriendo")
                {
                    var valoresPreliminares = await _datosTasacionArriendoService.ObtenerValoresPreliminares(datosTasacion);
                    return Ok(_responseHelper.ReturnOkResponse(valoresPreliminares, "Se han encontrado resultados para su búsqueda"));
                }
                else
                {
                    var valoresPreliminares = await _datosTasacionVentaService.ObtenerValoresPreliminares(datosTasacion);
                    return Ok(_responseHelper.ReturnOkResponse(valoresPreliminares, "Se han encontrado resultados para su búsqueda"));
                }
            }
            catch (Exception e)
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse("No se han encontrado resultados con los datos ingresados"));
            
            }
        }

        [HttpDelete("DeleteAll")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> DeleteAll(string tipo = "venta")
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

            if (tipo == "arriendo")
            {
                _datosTasacionArriendoService.DeleteAll();
            } else
            {
                _datosTasacionVentaService.DeleteAll();
            }                

            return Ok(_responseHelper.ReturnOkResponse("Datos de colección eliminados"));
        }

        [HttpPost("Upload")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UploadTasacion(IFormFile file, string tipo = "venta")
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

            if (tipo == "arriendo")
            {
                var result = await _datosTasacionArriendoService.UploadFile(filePath);
                return Ok(_responseHelper.ReturnOkResponse($"{ result.Count() } Elementos ingresados"));
            }
            else
            {
                var result = await _datosTasacionVentaService.UploadFile(filePath);
                return Ok(_responseHelper.ReturnOkResponse($"{ result.Count() } Elementos ingresados"));
            }

        }

    }
}     