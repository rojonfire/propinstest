using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.OrdenCompra;
using Corretaje.Api.Dto.Plan;
using Corretaje.Api.Dto.ServicioBase;
using Corretaje.Api.Render;
using Corretaje.Domain;
using Corretaje.Service.IServices.IOrdenCompra;
using Corretaje.Service.IServices.IServicio;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenDeCompraController : Controller
    {
        private readonly ICrearBoucher _crearBoucher;
        private readonly IMapper _mapper;
        private readonly IOptions<WebPayConfDto> _configuration;
        private readonly IOrdenCompraService _ordenDeCompraService;
        private readonly IOrdenCompraValidador _ordenCompraValidador;
        private readonly IOrdenCompraValidadorAgregarServicioAdicional _ordenCompraValidadorAgregarServicioAdicional;
        private readonly IResponseHelper _responseHelper;
        private readonly IServicioService<ServicioAdicional> _servicioAdicionalService;
        private readonly IViewRender _viewRender;

        public OrdenDeCompraController(IMapper mapper, IOrdenCompraService ordenDeCompraService, IOrdenCompraValidador ordenCompraValidador,
            IOrdenCompraValidadorAgregarServicioAdicional ordenCompraValidadorAgregarServicioAdicional,
            IResponseHelper responseHelper, ICrearBoucher crearBoucher,
            IOptions<WebPayConfDto> configuration, IServicioService<ServicioAdicional> servicioAdicionalService, IViewRender viewRender
            )
        {
            _crearBoucher = crearBoucher;
            _mapper = mapper;
            _ordenDeCompraService = ordenDeCompraService;
            _ordenCompraValidador = ordenCompraValidador;
            _ordenCompraValidadorAgregarServicioAdicional = ordenCompraValidadorAgregarServicioAdicional;
            _responseHelper = responseHelper;
            _configuration = configuration;
            _servicioAdicionalService = servicioAdicionalService;
            _viewRender = viewRender;
        }

        [HttpPost("AgregarOrdenDeCompraSinAddins")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgregarOrdenDeCompraSinAddins(BoucherDto ordenDeCompra)
        {
            //Creo Plan 
            var plan = await _crearBoucher.GetPlan(ordenDeCompra.PlanNombre);

            //Creo Lista de Servicios Adicionales
            var servicios = await _crearBoucher.GetServicioAdicional(ordenDeCompra.idPlanServicios);

            //Armo Orden de Compra Dto
            var orden = new OrdenDeCompraDto
            {
                Plan = new PlanDto
                {
                    Id = plan.Id.ToString(),
                    Nombre = plan.Nombre,
                    Precio = plan.Precio
                },
                Direccion = ordenDeCompra.Direccion,
                TipoPropiedad = ordenDeCompra.TipoPropiedad
            };

            foreach (var item in plan.ServiciosBase)
            {
                orden.Plan.ServiciosBase.Add(new ServicioBaseDto
                {
                    Id = item.Id.ToString(),
                    Nombre = item.Nombre
                });
            }

            orden.ServiciosAdicionales = new Collection<ServicioAdicionalDto>();

            if (servicios.Any())
            {
                foreach (var item in servicios)
                {
                    orden.ServiciosAdicionales.Add(new ServicioAdicionalDto
                    {
                        Id = item.Id.ToString(),
                        Nombre = item.Nombre,
                        Precio = item.Precio,
                        Subtitulo = item.Subtitulo,
                        TipoMoneda = item.TipoMoneda,
                        Estado = Estados.Transaccion.Iniciada,
                        Excluido = false
                    });
                }
            }


            orden.TipoDePlan = plan.Nombre;
            orden.PlanPrecioBaseEnUf = plan.Precio;
            orden.UsuarioId = ordenDeCompra.idUser;
            orden.Estado = Estados.Transaccion.Exitosa;

            var ordenDeCompraParaAgregar = _mapper.Map<OrdenDeCompra>(orden);

            if (!await _ordenCompraValidador.Validar(ordenDeCompraParaAgregar))
            {
                return Ok(Json(_responseHelper.ReturnWarningResponse(string.Join(",", _ordenCompraValidador.Errores))));
            }

            var respuestaDelServicio = await _ordenDeCompraService.GuardarOrdenDeCompra(ordenDeCompraParaAgregar);

            if (respuestaDelServicio != null)
            {
                var model = _mapper.Map<OrdenDeCompraDto>(respuestaDelServicio);

                await EnviarMailPlanContratado(respuestaDelServicio, model);

                return Ok(Json(new ResponseDto { Estado = Estados.Respuesta.Ok, Mensaje = "Orden Agregada" }));
            }
            else
            {
                return Ok(Json(new ResponseDto { Estado = Estados.Respuesta.Error, Mensaje = "Ocurrio un error al agregar la orden!" }));
            }

        }

        [HttpPost("AgregarServicioAdicional")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgregarServicioAdicional(string ordenCompraId, IEnumerable<string> serviciosAdicionalesId)
        {
            var ordenCompraParaClonar = await _ordenDeCompraService.GetOrdenDeCompraById(new ObjectId(ordenCompraId));

            _ordenDeCompraService.SetServiciosAdicionalesExcluidosCalculoPrecioOrdenCompra(ordenCompraParaClonar.ServiciosAdicionales);

            var serviciosAdicionalesParaAgregar = await _servicioAdicionalService.GetServiciosAdicionalesById(serviciosAdicionalesId.Select(id => new ObjectId(id)));

            // Se añaden los servicios adicionales a la orden de compra para anular con el objectivo de realizar la validación.
            ordenCompraParaClonar.ServiciosAdicionales.AddRange(serviciosAdicionalesParaAgregar);

            if (!await _ordenCompraValidadorAgregarServicioAdicional.Validar(ordenCompraParaClonar))
            {
                return Ok(Json(_responseHelper.ReturnWarningResponse(string.Join(",", _ordenCompraValidadorAgregarServicioAdicional.Errores))));
            }

            var ordenCompra = ClonarOrdenCompra(ordenCompraParaClonar);

            var respuesta = _mapper.Map<OrdenDeCompraDto>(await _ordenDeCompraService.GuardarOrdenDeCompra(ordenCompra));

            string apiUrl = _configuration.Value.Init;
            string urlFinal = _configuration.Value.Result;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(apiUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                var json = JsonConvert.SerializeObject(new EntryTrxDto
                {
                    Monto = Math.Ceiling(respuesta.TotalEnPesoChilenoConIVA).ToString(CultureInfo.InvariantCulture),
                    OrdenDeCompra = respuesta.Id,
                    SessionId = respuesta.Id,
                    UrlFinal = urlFinal
                });

                var stringContent = new StringContent(json, Encoding.UTF8, "application/json");
                var response = await client.PostAsync(apiUrl, stringContent);
                if (!response.IsSuccessStatusCode) return Ok(Json(new ResponseDto { Estado = Estados.Respuesta.Error, Mensaje = "Error Trx" }));
                var data = await response.Content.ReadAsStringAsync();
                var res = JsonConvert.DeserializeObject<RespuestaTrxDto>(data);
                res.PrecioTotal = Math.Ceiling(respuesta.TotalEnPesoChilenoConIVA).ToString(CultureInfo.InvariantCulture);
                res.IdOrden = respuesta.Id;

                return Ok(Json(new ResponseDto { Data = res, Estado = Estados.Respuesta.Ok, Mensaje = "Init Trx" }));
            }

            // string mailHtml = await _viewRender.RenderToStringAsync("~/Template/servicio-adicional-agregado.cshtml", respuesta);

            // var attachmentsPath = new List<string>() { "Template/terminos-condiciones.pdf" };

            // _ordenDeCompraService.SendEmail(ordenCompra, mailHtml, attachmentsPath);

            // return Ok(Json(_responseHelper.ReturnOkResponse(respuesta)));
        }

        [HttpPost("AgregarOrdenDeCompra")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgregarOrdenDeCompra(BoucherDto ordenDeCompra)
        {
            //Creo Plan 
            var plan = await _crearBoucher.GetPlan(ordenDeCompra.PlanNombre);

            //Creo Lista de Servicios Adicionales
            var servicios = await _crearBoucher.GetServicioAdicional(ordenDeCompra.idPlanServicios);

            //Armo Orden de Compra Dto
            var orden = new OrdenDeCompraDto
            {
                Plan = new PlanDto
                {
                    Id = plan.Id.ToString(),
                    Nombre = plan.Nombre,
                    Precio = plan.Precio
                },
                Direccion = ordenDeCompra.Direccion,
                TipoPropiedad = ordenDeCompra.TipoPropiedad
            };

            foreach (var item in plan.ServiciosBase)
            {
                orden.Plan.ServiciosBase.Add(new ServicioBaseDto
                {
                    Id = item.Id.ToString(),
                    Nombre = item.Nombre
                });
            }

            orden.ServiciosAdicionales = new Collection<ServicioAdicionalDto>();

            foreach (var item in servicios)
            {
                orden.ServiciosAdicionales.Add(new ServicioAdicionalDto
                {
                    Id = item.Id.ToString(),
                    Nombre = item.Nombre,
                    Precio = item.Precio,
                    Subtitulo = item.Subtitulo,
                    TipoMoneda = item.TipoMoneda,
                    Estado = Estados.Transaccion.Iniciada,
                    ImagenUrl = item.ImagenUrl,
                    Excluido = false
                });
            }

            orden.TipoDePlan = plan.Nombre;
            orden.PlanPrecioBaseEnUf = plan.Precio;
            orden.UsuarioId = ordenDeCompra.idUser;
            orden.Estado = Estados.Transaccion.Exitosa;

            var ordenDeCompraParaAgregar = _mapper.Map<OrdenDeCompra>(orden);

            if (!await _ordenCompraValidador.Validar(ordenDeCompraParaAgregar))
            {
                return Ok(Json(_responseHelper.ReturnWarningResponse(string.Join(",", _ordenCompraValidador.Errores))));
            }

            var respuestaDelServicio = await _ordenDeCompraService.GuardarOrdenDeCompra(ordenDeCompraParaAgregar);

            var ordenDeCompraAgregada = _mapper.Map<OrdenDeCompraDto>(respuestaDelServicio);

            string apiUrl = _configuration.Value.Init;
            string urlFinal = _configuration.Value.Result;

            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(apiUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                    var json = JsonConvert.SerializeObject(new EntryTrxDto
                    {
                        Monto = Math.Ceiling(ordenDeCompraAgregada.TotalEnPesoChilenoConIVA).ToString(CultureInfo.InvariantCulture),
                        OrdenDeCompra = ordenDeCompraAgregada.Id,
                        SessionId = ordenDeCompraAgregada.Id,
                        UrlFinal = urlFinal
                    });

                    var stringContent = new StringContent(json, Encoding.UTF8, "application/json");
                    var response = await client.PostAsync(apiUrl, stringContent);
                    if (!response.IsSuccessStatusCode) return Ok(Json(new ResponseDto { Estado = Estados.Respuesta.Error, Mensaje = "Error Trx" }));
                    var data = await response.Content.ReadAsStringAsync();
                    var res = JsonConvert.DeserializeObject<RespuestaTrxDto>(data);
                    res.PrecioTotal = Math.Ceiling(ordenDeCompraAgregada.TotalEnPesoChilenoConIVA).ToString(CultureInfo.InvariantCulture);
                    res.IdOrden = ordenDeCompraAgregada.Id;

                    return Ok(Json(new ResponseDto { Data = res, Estado = Estados.Respuesta.Ok, Mensaje = "Init Trx" }));
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("GetOrdenDeCompraById")]
        [ProducesResponseType(200, Type = typeof(OrdenDeCompraDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetOrdenDeCompraById(string ordenDeCompraId)
        {
            if (string.IsNullOrWhiteSpace(ordenDeCompraId))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(ordenDeCompraId))));
            }

            var serviceResponse = await _ordenDeCompraService.GetOrdenDeCompraById(new ObjectId(ordenDeCompraId));

            if (serviceResponse == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var ordenDeCompra = _mapper.Map<OrdenDeCompra, OrdenDeCompraDto>(serviceResponse);

            return Ok(Json(_responseHelper.ReturnOkResponse(ordenDeCompra)));
        }

        [HttpPost("NotificarRespuestaTransaccion")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> NotificarRespuestaTransaccion(OrdenCompraRespuestaTransaccionDto respuestaTransaccion)
        {
            if (string.IsNullOrWhiteSpace(respuestaTransaccion.OrdenCompraId))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(respuestaTransaccion.OrdenCompraId))));
            }

            var ordenCompra = await _ordenDeCompraService.GetOrdenDeCompraById(new ObjectId(respuestaTransaccion.OrdenCompraId));

            SetRespuestaTransaccion(ordenCompra, respuestaTransaccion);

            if (!string.IsNullOrEmpty(ordenCompra.OrdenCompraAnuladaId))
            {
                var ordenCompraParaAnular = await _ordenDeCompraService.GetOrdenDeCompraById(new ObjectId(ordenCompra.OrdenCompraAnuladaId));
                await _ordenDeCompraService.AnularOrdenCompra(ordenCompraParaAnular);
            }

            await _ordenDeCompraService.Update(ordenCompra);

            var model = _mapper.Map<OrdenDeCompraDto>(ordenCompra);

            await EnviarMailPlanContratado(ordenCompra, model);

            return Ok(Json(_responseHelper.ReturnOkResponse(null, "Mail enviado")));
        }

        private async Task EnviarMailPlanContratado(OrdenDeCompra ordenCompra, OrdenDeCompraDto model)
        {
            var mailHtml = await _viewRender.RenderToStringAsync("~/Template/plan-contratado.cshtml", model);

            var attachmentsPath = new List<string> { "Template/terminos-condiciones.pdf" };

            _ordenDeCompraService.SendEmail(ordenCompra, mailHtml, attachmentsPath);
        }

        private void SetRespuestaTransaccion(OrdenDeCompra ordenCompra, OrdenCompraRespuestaTransaccionDto respuestaTransaccion)
        {
            ordenCompra.CodigoComercio = respuestaTransaccion.CodigoComercio;
            ordenCompra.CodigoVerificacion = respuestaTransaccion.CodigoVerificacion;
            ordenCompra.Estado = Estados.Transaccion.Exitosa;
        }

        private OrdenDeCompra ClonarOrdenCompra(OrdenDeCompra ordenCompra)
        {
            var ordenCompraClon = ordenCompra.ShallowCopy();

            ordenCompraClon.Id = new ObjectId();
            ordenCompraClon.Estado = Estados.Transaccion.Iniciada;
            ordenCompraClon.OrdenCompraAnuladaId = ordenCompra.Id.ToString();

            return ordenCompraClon;
        }
    }
}
