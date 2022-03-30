using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Commons.Agenda;
using Corretaje.Api.Commons.Oferta;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Oferta;
using Corretaje.Api.Render;
using Corretaje.Common.Extension;
using Corretaje.Domain;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IOferta;
using Corretaje.Service.IServices.IPropiedad;
using Corretaje.Service.IServices.IUsuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OfertaController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IOfertaHelper _ofertaHelper;
        private readonly IOfertaService _ofertaService;
        private readonly IClienteService _clienteService;
        private readonly IOfertaValidadorActualizar<Oferta> _ofertaValidadorActualizar;
        private readonly IOfertaValidadorAgregar<Oferta> _ofertaValidadorAgregar;
        private readonly IPropiedadService _propiedadService;
        private readonly IResponseHelper _responseHelper;
        private readonly IAgendaHelper _agendaHelper;
        private readonly IUsuarioService _usuarioService;
        private readonly IViewRender _viewRender;

        public OfertaController(IMapper mapper, IOfertaHelper ofertaHelper, IOfertaService ofertaService, IClienteService clienteService, IOfertaValidadorActualizar<Oferta> ofertaValidadorActualizar, IOfertaValidadorAgregar<Oferta> ofertaValidadorAgregar, IPropiedadService propiedadService, IResponseHelper responseHelper, IAgendaHelper agendaHelper, IUsuarioService usuarioService, IViewRender viewRender)
        {
            _mapper = mapper;
            _ofertaHelper = ofertaHelper;
            _ofertaService = ofertaService;
            _clienteService = clienteService;
            _ofertaValidadorActualizar = ofertaValidadorActualizar;
            _ofertaValidadorAgregar = ofertaValidadorAgregar;
            _propiedadService = propiedadService;
            _responseHelper = responseHelper;
            _agendaHelper = agendaHelper;
            _usuarioService = usuarioService;
            _viewRender = viewRender;
        }

        [HttpPut("AceptarOferta")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AceptarOferta(string ofertaId)
        {
            if (string.IsNullOrWhiteSpace(ofertaId))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(ofertaId))));
            }

            var oferta = await _ofertaService.GetOfertaById(new ObjectId(ofertaId));

            var respuestaDelServicio = await _ofertaService.AceptarOferta(new ObjectId(ofertaId));

            var ofertaCerrada = _mapper.Map<OfertaDto>(respuestaDelServicio);

            bool contraofertada;
            //oferta inicial del comprador fue aceptada
            if (oferta.Estado == Estados.Oferta.Null)
            {
                contraofertada = false;
            } else //oferta de la contraoferta del vendedor fue aceptada
            {
                contraofertada = true;
            }

            await SendEmailOfertaAceptadaVendedor(respuestaDelServicio, contraofertada);
            await SendEmailOfertaAceptadaComprador(respuestaDelServicio, contraofertada);

            return Ok(Json(_responseHelper.ReturnOkResponse(ofertaCerrada)));
        }

        [HttpPost("AgregarOferta")]
        [ProducesResponseType(201, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgregarOferta(OfertaAgregarDto oferta)
        {
            var ofertaParaAgregar = _mapper.Map<Oferta>(oferta);

            if (!await _ofertaValidadorAgregar.EsValido(ofertaParaAgregar))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponse(string.Join(",", _ofertaValidadorAgregar.Errores))));
            }

            ofertaParaAgregar.FechaOferta = DateTime.Now;

            ofertaParaAgregar.FechaVencimiento = DateTime.Now.AddDays(2);

            var resultado = await _ofertaService.AgregarOferta(ofertaParaAgregar);

            if (oferta.MontoDePublicacion == oferta.MontoDeOferta)
            {
                resultado = await _ofertaService.AceptarOferta(resultado.Id);
            }
            
            await SendEmailOfertaEmitidaVendedor(ofertaParaAgregar);

            await SendEmailOfertaEmitidaComprador(ofertaParaAgregar);

            var ofertaAgregada = _mapper.Map<OfertaDto>(resultado);

            string resultadoMensaje = GetResultadoMensaje(resultado);

            await OfertaSendEmailOfertaEmitidaCopiaAdministrador(ofertaAgregada);

            if (resultado.Estado == Estados.Oferta.Aceptada)
            {
                await SendEmailOfertaAceptadaComprador(ofertaParaAgregar, false);
                await SendEmailOfertaAceptadaVendedor(ofertaParaAgregar, false);
            }

            return CreatedAtAction(nameof(GetOfertaById), new { ofertaId = ofertaAgregada.Id }, _responseHelper.ReturnOkResponse(ofertaAgregada, resultadoMensaje));
        }

        [HttpPut("AgregarMensajeAOferta")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgregarMensajeAOferta(string ofertaId, MensajeOfertaDto mensajeOferta)
        {
            if (string.IsNullOrWhiteSpace(ofertaId))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(ofertaId))));
            }

            if (mensajeOferta == null)
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponse($"parámetro {nameof(mensajeOferta)} es null")));
            }

            var mensajeParaAgregar = _mapper.Map<MensajeOferta>(mensajeOferta);

            var oferta = await _ofertaService.AgregarMensajeAOferta(new ObjectId(ofertaId), mensajeParaAgregar);

            return Ok(Json(_responseHelper.ReturnOkResponse(oferta)));
        }

        [HttpPut("DeclinarOferta")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> DeclinarOferta(string ofertaId)
        {
            if (string.IsNullOrWhiteSpace(ofertaId))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(ofertaId))));
            }

            var oferta = await _ofertaService.GetOfertaById(new ObjectId(ofertaId));

            var respuestaDelServicio = await _ofertaService.DeclinarOferta(new ObjectId(ofertaId));

            var ofertaDeclinada = _mapper.Map<OfertaDto>(respuestaDelServicio);

            bool contraofertada;
            //si la oferta fue rechazada sin ser contraofertada, es decir, fue rechazada por el vendedor
            if (oferta.Estado == Estados.Oferta.Null)
            {
                contraofertada = false;
            }
            else //si la oferta fue rechazada despues de ser contraofertada, es decir, fue rechazada por el comprador
            {
                contraofertada = true;
            }

            await SendEmailOfertaDeclinadaVendedor(respuestaDelServicio, contraofertada);
            await SendEmailOfertaDeclinadaComprador(respuestaDelServicio, contraofertada);

            return Ok(Json(_responseHelper.ReturnOkResponse(ofertaDeclinada)));
        }

        [HttpPost("EliminarOferta")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public IActionResult EliminarOferta(string ofertaId)
        {
            if (string.IsNullOrWhiteSpace(ofertaId))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(ofertaId))));
            }

            _ofertaService.EliminarOferta(new ObjectId(ofertaId));

            return Ok(Json(_responseHelper.ReturnOkResponse(null)));
        }

        [HttpGet("GetTodasLasOfertasVigentes")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetTodasLasOfertasVigentes()
        {
            var respuestaDelServicio = await _ofertaService.GetTodasLasOfertasVigentes();

            if (respuestaDelServicio.IsNullOrEmpty())
            {
                return NotFound(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var ofertasVigentes = _mapper.Map<IEnumerable<OfertaDto>>(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(ofertasVigentes)));
        }

        [HttpGet("GetOfertaById")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetOfertaById(string ofertaId)
        {
            if (string.IsNullOrWhiteSpace(ofertaId))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(ofertaId))));
            }

            var respuestaDelServicio = await _ofertaService.GetOfertaById(new ObjectId(ofertaId));

            if (respuestaDelServicio == null)
            {
                return NotFound(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var oferta = _mapper.Map<OfertaDto>(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(oferta)));
        }

        [HttpGet("GetOfertaByOfertaIdAndOfertadorId")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetOfertaByOfertaIdAndOfertadorId(string ofertaId, string ofertadorId)
        {
            if (string.IsNullOrWhiteSpace(ofertaId))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(ofertaId))));
            }

            if (string.IsNullOrWhiteSpace(ofertadorId))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(ofertadorId))));
            }

            var respuestaDelServicio = await _ofertaService.GetOfertaByOfertaIdAndOfertadorId(new ObjectId(ofertaId), ofertadorId);

            if (respuestaDelServicio == null)
            {
                return NotFound(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var oferta = _mapper.Map<OfertaDto>(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(oferta)));
        }

        [HttpGet("GetOfertaByOfertaIdAndPropietarioId")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetOfertaByOfertaIdAndPropietarioId(string ofertaId, string propietarioId)
        {
            if (string.IsNullOrWhiteSpace(ofertaId))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(ofertaId))));
            }

            if (string.IsNullOrWhiteSpace(propietarioId))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(propietarioId))));
            }

            var respuestaDelServicio = await _ofertaService.GetOfertaByOfertaIdAndPropietarioId(new ObjectId(ofertaId), propietarioId);

            if (respuestaDelServicio == null)
            {
                return NotFound(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var oferta = _mapper.Map<OfertaDto>(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(oferta)));
        }

        [HttpGet("GetOfertaByPropietarioId")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetOfertaByPropietarioId(string propietarioId)
        {

            if (string.IsNullOrWhiteSpace(propietarioId))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(propietarioId))));
            }

            var respuestaDelServicio = await _ofertaService.GetOfertaByPropietarioId(propietarioId);

            if (respuestaDelServicio == null)
            {
                return NotFound(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            return Ok(Json(_responseHelper.ReturnOkResponse(respuestaDelServicio)));
        }

        [HttpGet("GetOfertaByOfertadorId")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetOfertaByOfertadorId(string ofertadorId)
        {
            if (string.IsNullOrWhiteSpace(ofertadorId))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(ofertadorId))));
            }

            var respuestaDelServicio = await _ofertaService.GetOfertasByOfertador(ofertadorId);

            if (respuestaDelServicio == null)
            {
                return NotFound(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            return Ok(Json(_responseHelper.ReturnOkResponse(respuestaDelServicio)));
        }

        [HttpGet("GetOfertasByPublicacionId")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetOfertasByPublicacionId(string publicacionId)
        {
            if (string.IsNullOrWhiteSpace(publicacionId))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(publicacionId))));
            }

            var respuestaDelServicio = await _ofertaService.GetOfertasByPublicacionId(publicacionId);

            if (respuestaDelServicio == null)
            {
                return NotFound(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            return Ok(Json(_responseHelper.ReturnOkResponse(respuestaDelServicio)));
        }

        [HttpGet("GetOfertasVigentesByPropietarioId")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetOfertasVigentesByPropietarioId(string propietarioId)
        {
            if (string.IsNullOrWhiteSpace(propietarioId))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(propietarioId))));
            }

            var respuestaDelServicio = await _ofertaService.GetOfertasVigentesByPropietarioId(propietarioId);

            if (respuestaDelServicio == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            return Ok(Json(_responseHelper.ReturnOkResponse(respuestaDelServicio)));

        }

        //es para contraofertar
        [HttpPut("UpdateOfertaEstado")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UpdateOfertaEstado(string ofertaId, string monto)
        {
            if (string.IsNullOrWhiteSpace(ofertaId))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(ofertaId))));
            }

            var respuestaDelServicio = await _ofertaService.GetOfertaById(new ObjectId(ofertaId));

            //el cliente es el interesado en comprar la propiedad, por ende el usuario es el duenio de la propiedad y es quien contraoferta el monto inicial
            Estados.OfertaEmision emitidoPor = Estados.OfertaEmision.Usuario;

            respuestaDelServicio.MontoDeOferta = decimal.Parse(monto);

            if (!await _ofertaValidadorActualizar.EsValido(respuestaDelServicio))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponse(string.Join(",", _ofertaValidadorActualizar.Errores))));
            }

            respuestaDelServicio.MontoMaximo = respuestaDelServicio.MontoDeOferta;

            respuestaDelServicio.Estado = Estados.Oferta.Rechazada;

            respuestaDelServicio.FechaOferta = DateTime.Now;

            respuestaDelServicio.FechaVencimiento = DateTime.Now.AddDays(2);

            var up = await _ofertaService.UpdateOferta(respuestaDelServicio);

            await SendEmailOfertaRechazadaComprador(respuestaDelServicio);
            await SendEmailOfertaRechazadaVendedor(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(up)));
        }

        [HttpGet("Vencer")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Vencer(string ofertaId, string monto)
        {
            _ofertaService.DeclinarOfertasCaducadas();
            return Ok(Json(_responseHelper.ReturnOkResponse(null)));
        }

        private async Task SendEmailOferta(Oferta oferta)
        {
            switch (oferta.Estado)
            {
                case Estados.Oferta.Aceptada:
                    //await SendEmailOfertaAceptada(oferta);
                    break;
                case Estados.Oferta.Declinada:
                    break;
                case Estados.Oferta.Null:
                    await SendEmailOfertaEmitidaComprador(oferta);
                    await SendEmailOfertaEmitidaVendedor(oferta);

                    break;
                case Estados.Oferta.Rechazada:
                    //await SendEmailContraOferta(oferta);
                    break;
                case Estados.Oferta.ContratoBorrador:
                    break;
                case Estados.Oferta.ContratoFinalizado:
                    break;
                default:
                    break;
            }

            oferta.FechaOferta = DateTime.Now;
        }

        private async Task SendEmailOfertaEmitidaComprador(Oferta oferta)
        {
            var datosEmail = _mapper.Map<OfertaDto>(oferta);

            _ofertaHelper.SetUrlContraOferta(datosEmail);

            string mailHtml = await _viewRender.RenderToStringAsync("~/Template/Oferta-realizada-compradorNUEVO.cshtml", datosEmail);

            _ofertaService.OfertaSendEmailOfertaEmitidaComprador(oferta, mailHtml);
        }

        private async Task SendEmailOfertaEmitidaVendedor(Oferta oferta)
        {
            var datosEmail = _mapper.Map<OfertaDto>(oferta);

            _ofertaHelper.SetUrlContraOferta(datosEmail);

            string mailHtml = await _viewRender.RenderToStringAsync("~/Template/Oferta-realizada-vendedorNUEVO.cshtml", datosEmail);

            _ofertaService.OfertaSendEmailOfertaEmitidaVendedor(oferta, mailHtml);
        }

        private async Task SendEmailOfertaAceptadaComprador(Oferta oferta, bool contraofertada)
        {
            var datosEmail = _mapper.Map<OfertaDto>(oferta);
            string mailHtml = "";
            if (contraofertada)
            {
                mailHtml = await _viewRender.RenderToStringAsync("~/Template/ContraOferta-aceptada-compradorNUEVO.cshtml", datosEmail);
            }
            else
            {
                mailHtml = await _viewRender.RenderToStringAsync("~/Template/Oferta-aceptada-compradorNUEVO.cshtml", datosEmail);
            }

            _ofertaService.OfertaSendEMailOfertaAceptadaComprador(oferta, mailHtml);
        }

        private async Task SendEmailOfertaAceptadaVendedor(Oferta oferta, bool contraofertada)
        {
            var datosEmail = _mapper.Map<OfertaDto>(oferta);
            string mailHtml = "";
            if (contraofertada)
            {
                mailHtml = await _viewRender.RenderToStringAsync("~/Template/ContraOferta-aceptada-vendedorNUEVO.cshtml", datosEmail);
            }
            else
            {
                mailHtml = await _viewRender.RenderToStringAsync("~/Template/Oferta-aceptada-vendedorNUEVO.cshtml", datosEmail);
            }

            _ofertaService.OfertaSendEMailOfertaAceptadaVendedor(oferta, mailHtml);
        }

        private async Task SendEmailOfertaDeclinadaVendedor(Oferta oferta, bool contraofertada)
        {
            var datosEmail = _mapper.Map<OfertaDto>(oferta);
            string mailHtml = "";
            if (contraofertada)
            {
                mailHtml = await _viewRender.RenderToStringAsync("~/Template/ContraOferta-rechazada-vendedor(han rechazado tu Contraoferta)NUEVO.cshtml", datosEmail);
            }
            else
            {
                mailHtml = await _viewRender.RenderToStringAsync("~/Template/Oferta-rechazada-vendedor(rechazaste la oferta)NUEVO.cshtml", datosEmail);
            }

            _ofertaService.OfertaSendEMailOfertaDeclinadaVendedor(oferta, mailHtml);
        }

        private async Task SendEmailOfertaDeclinadaComprador(Oferta oferta, bool contraofertada)
        {
            var datosEmail = _mapper.Map<OfertaDto>(oferta);
            string mailHtml = "";
            if (contraofertada)
            {
                mailHtml = await _viewRender.RenderToStringAsync("~/Template/Oferta-rechazada-Comprador(rechazaste la contraoferta)NUEVO.cshtml", datosEmail);
            }
            else
            {
                mailHtml = await _viewRender.RenderToStringAsync("~/Template/Oferta-rechazada-comprador(han rechazado tu oferta)NUEVO.cshtml", datosEmail);
            }

            _ofertaService.OfertaSendEMailOfertaDeclinadaComprador(oferta, mailHtml);
        }

        private async Task SendEmailOfertaRechazadaVendedor(Oferta oferta)
        {
            var datosEmail = _mapper.Map<OfertaDto>(oferta);
            string mailHtml = await _viewRender.RenderToStringAsync("~/Template/ContraOferta-realizada-vendedorNUEVO.cshtml", datosEmail);
            _ofertaService.OfertaSendEMailOfertaRechazadaVendedor(oferta, mailHtml);
        }

        private async Task SendEmailOfertaRechazadaComprador(Oferta oferta)
        {
            var datosEmail = _mapper.Map<OfertaDto>(oferta);
            string mailHtml =  await _viewRender.RenderToStringAsync("~/Template/ContraOferta-realizada-compradorNUEVO.cshtml", datosEmail);
            _ofertaService.OfertaSendEMailOfertaRechazadaComprador(oferta, mailHtml);
        }

        /*
        

        private async Task SendEmailContraOferta(Oferta oferta)
        {
            var datosEmail = _mapper.Map<OfertaDto>(oferta);

            _ofertaHelper.SetUrlContraOferta(datosEmail);

            string mailHtml = await _viewRender.RenderToStringAsync("~/Template/Contraoferta.cshtml", datosEmail);

            _ofertaService.OfertaSendEMailOfertaRechazada(oferta, mailHtml);
        }
        private async Task SendEmailOfertaEmitidaComprador(Oferta oferta)
        {
            var datosEmail = _mapper.Map<OfertaDto>(oferta);

            _ofertaHelper.SetUrlContraOferta(datosEmail);

            string mailHtml = await _viewRender.RenderToStringAsync("~/Template/OfertaEmitidaComprador.cshtml", datosEmail);

            _ofertaService.OfertaSendEmailOfertaEmitidaComprador(oferta, mailHtml);
        }
        */
        private string GetResultadoMensaje(Oferta oferta)
        {
            return oferta.Estado == Estados.Oferta.Aceptada ? "Tu oferta ha sido aceptada" : "Tu oferta ha sido enviada a nuestro cliente";
        }

        private async Task OfertaSendEmailOfertaEmitidaCopiaAdministrador(OfertaDto ofertaAgregada)
        {
            var propietario = await _clienteService.Get(new ObjectId(ofertaAgregada.PropietarioId));
            var propiedad = await _propiedadService.Get(new ObjectId(ofertaAgregada.PublicacionId));
            var emisor = await _usuarioService.Get(new ObjectId(ofertaAgregada.OfertadorId));

            var oferta = new OfertaInformacionAdministradorDto()
            {
                MontoDeOferta = ofertaAgregada.MontoDeOferta,
                OfertadorNombre = ofertaAgregada.OfertadorNombre,
                OfertadorRut = ofertaAgregada.OfertadorRut,
                ReceptorNombre = propietario.Nombres,
                ReceptorRut = propietario.Rut,
                DireccionReferencial = propiedad.DireccionReferencial,
                DireccionCompleta = _agendaHelper.GetDireccionPropiedad(propiedad),
                PropiedadId = propiedad.CodigoPropiedad,
                EmisorEmail = emisor.Email,
                ReceptorEmail = propietario.Mail
            };

            string mailHtml = await _viewRender.RenderToStringAsync("~/Template/oferta-emitida-copia-administrador.cshtml", oferta);

            _ofertaService.OfertaSendEmailOfertaEmitidaCopiaAdministrador(mailHtml);
        }
    }
}