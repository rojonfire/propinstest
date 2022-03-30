using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Commons.Tasacion;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Tasacion;
using Corretaje.Domain;
using Corretaje.Domain.Tasacion;
using Corretaje.Service.IServices.IDatosTasacion;
using Corretaje.Service.IServices.IDatosTasacion.IDatosTasacionArriendo;
using Corretaje.Service.IServices.IDatosTasacion.IDatosTasacionVenta;
using Corretaje.Service.IServices.IPlan;
using Corretaje.Service.IServices.IPropiedad;
using Corretaje.Service.IServices.ITasacion;
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
    public class TasacionController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IMapHelper _mapHelper;
        private readonly IResponseHelper _responseHelper;
        private readonly ITasacionConfiguracion _tasacionConfiguracion;
        private readonly ITasacionHelper _tasacionHelper;
        private readonly ITasacionService _tasacionService;
        private readonly IDatosTasacionArriendoService _datosTasacionArriendoService;
        private readonly IDatosTasacionVentaService _datosTasacionVentaService;
        private readonly IPropiedadService _propiedadService;
        private readonly IPlanService _planService;

        public TasacionController(IMapper mapper, IMapHelper mapHelper,
            IResponseHelper responseHelper, ITasacionConfiguracion tasacionConfiguracion,
            ITasacionHelper tasacionHelper, ITasacionService tasacionService,
            IDatosTasacionArriendoService datosTasacionArriendoService, IDatosTasacionVentaService datosTasacionVentaService, IPropiedadService propiedadService,
            IPlanService planService)
        {
            _mapper = mapper;
            _responseHelper = responseHelper;
            _tasacionConfiguracion = tasacionConfiguracion;
            _tasacionHelper = tasacionHelper;
            _tasacionService = tasacionService;
            _datosTasacionArriendoService = datosTasacionArriendoService;
            _datosTasacionVentaService = datosTasacionVentaService;
            _propiedadService = propiedadService;
            _mapHelper = mapHelper;
            _planService = planService;
        }

        /*
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> TasarPropiedad(TasacionRequestDto tasacionRequest)
        {
            tasacionRequest.NumeroSolicitud = await _tasacionService.GenerarNumeroSolicitud();

            var contenido = _tasacionHelper.GetRequestContent(tasacionRequest);

            var tasacion = await _apiClient.PostAsync<TasacionDto>(new Uri(_tasacionConfiguracion.TasacionUrl), contenido, _tasacionConfiguracion.TokenBearer);

            if (!_tasacionHelper.EsValida(tasacion))
            {
                return Ok(Json(_responseHelper.ReturnErrorResponse(null, "Tasación incorrecta, no se han encontrado datos de su propiedad")));
            }

            tasacion.IdUser = tasacionRequest.IdUser;

            await _tasacionService.Add(_mapper.Map<Tasacion>(tasacion));

            //Update Tasacion Compra
            var respuestaServicio = await _ordenCompraService.GetOrdenesDeCompraByUsuarioId(tasacionRequest.IdUser);

            if (respuestaServicio.Any())
            {
                var ordenesFinalizadas = respuestaServicio.FirstOrDefault(o => o.Estado == Estados.Transaccion.Exitosa);
                if (ordenesFinalizadas.ServiciosAdicionales.Count > 0)
                {
                    var servicio = ordenesFinalizadas.ServiciosAdicionales.FirstOrDefault(s => s.Nombre == "Tasación");
                    if (servicio != null)
                    {
                        ordenesFinalizadas.ServiciosAdicionales.FirstOrDefault(s => s.Nombre == "Tasación").Estado =
                            Estados.Transaccion.Exitosa;

                        await _ordenCompraService.Update(ordenesFinalizadas);
                    }

                }

            }

            return Ok(Json(_responseHelper.ReturnOkResponse(tasacion)));
        }


        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get(string idUser)
        {

            var tasaciones = await _tasacionService.GetForQuery(idUser);

            var list = tasaciones.Select(t => new { Glosa = t.DescripcionPropiedad, Id = t.Id.ToString() })
                .ToList();

            return Ok(Json(_responseHelper.ReturnOkResponse(list)));
        }

        [HttpGet("GetPdf")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetPdf(string id)
        {
            var tasacion = await _tasacionService.Get(ObjectId.Parse(id));

            return Ok(Json(_responseHelper.ReturnOkResponse(tasacion.ReferenciaDeMercado.Informe)));
        }
        */

        [HttpGet("GetByPropiedadId")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetByIdPropiedad(string idPropiedad)
        {
            if (string.IsNullOrWhiteSpace(idPropiedad))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(idPropiedad)));
            }

            var tasacion = await _tasacionService.GetByPropiedadId(idPropiedad);
            if (tasacion == null)
            {
                return BadRequest(_responseHelper.ReturnNotFoundResponse());
            }

            return Ok(_responseHelper.ReturnOkResponse(tasacion));
        }

        [HttpPost("GetTasacion")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetTasacionPropiedad(TasacionPropiedadDto tasacionPropiedadDto, string tipo = "venta")
        {
            var tasacionPropiedad = _mapper.Map<TasacionPropiedad>(tasacionPropiedadDto);

            IEnumerable<DatosTasacion> datosTasacion;
            IEnumerable<DatosTasacion> propiedadesSimilares;

            if (tipo == "arriendo")
            {
                datosTasacion = await _datosTasacionArriendoService.FiltrarTasacion(tasacionPropiedad);
                propiedadesSimilares = await _datosTasacionArriendoService.GetPropiedadesSimilares(tasacionPropiedad);
            } else
            {
                datosTasacion = await _datosTasacionVentaService.FiltrarTasacion(tasacionPropiedad);
                propiedadesSimilares = await _datosTasacionVentaService.GetPropiedadesSimilares(tasacionPropiedad);
            }

            if (datosTasacion.Count() == 0)
            {
                return BadRequest(_responseHelper.ReturnNotFoundResponse());
            }

            var tasacion = await _tasacionService.GetTasacionPropiedad(datosTasacion, tasacionPropiedad);
            tasacion.PropiedadesSimilares = propiedadesSimilares;

            var tasacionAdd = await _tasacionService.Add(tasacion);

            return Ok(_responseHelper.ReturnOkResponse(tasacion));
        }

        [HttpPost("GetTasacionPropiedad")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetTasacionPropiedad(string idPropiedad)
        {
            var propiedad = await _propiedadService.Get(new ObjectId(idPropiedad));
            if (propiedad == null)
            {
                return BadRequest(_responseHelper.ReturnNotFoundResponse());
            }

            var tasacionPropiedad = _mapHelper.MapPropiedadATasacion(propiedad);

            var encontrado = await _tasacionService.GetByPropiedadId(idPropiedad);
            if (encontrado != null)
            {
                _tasacionService.Delete(encontrado.Id);
            }

            IEnumerable<DatosTasacion> datosTasacion;
            IEnumerable<DatosTasacion> propiedadesSimilares;

            var plan = await _planService.GetPlanById(propiedad.PlanContratado.Id);
            if (plan.EsVenta)
            {
                datosTasacion = await _datosTasacionVentaService.FiltrarTasacion(tasacionPropiedad);
                propiedadesSimilares = await _datosTasacionVentaService.GetPropiedadesSimilares(tasacionPropiedad);
            }
            else
            {
                datosTasacion = await _datosTasacionArriendoService.FiltrarTasacion(tasacionPropiedad);
                propiedadesSimilares = await _datosTasacionArriendoService.GetPropiedadesSimilares(tasacionPropiedad);
            }

            if (datosTasacion.Count() == 0)
            {
                return BadRequest(_responseHelper.ReturnNotFoundResponse());
            }

            var tasacion = await _tasacionService.GetTasacionPropiedad(datosTasacion, tasacionPropiedad);

            tasacion.PropiedadesSimilares = propiedadesSimilares;
            tasacion.IdPropiedad = idPropiedad;

            var tasacionAdd = await _tasacionService.Add(tasacion);

            return Ok(_responseHelper.ReturnOkResponse(tasacion));
        }
    }
}