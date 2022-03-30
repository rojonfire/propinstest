using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Contrato;
using Corretaje.Api.Render;
using Corretaje.Common.Extension;
using Corretaje.Common.Pdf;
using Corretaje.Domain;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IPropiedad;
using Corretaje.Service.IServices.IUsuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ContratoController : Controller
    {
        private readonly IClienteService _clienteService;
        private readonly IContratoHelper _contratoHelper;
        private readonly IContratoService _contratoService;
        private readonly IMapper _mapper;
        private readonly IPdfCreador _pdfCreador;
        private readonly IPropiedadService _propiedadService;
        private readonly IResponseHelper _responseHelper;
        private readonly IUsuarioService _usuarioService;
        private readonly IViewRender _viewRender;

        public ContratoController(IClienteService clienteService, IContratoHelper contratoHelper, IContratoService contratoService, IMapper mapper, IPdfCreador pdfCreador, IPropiedadService propiedadService, IResponseHelper responseHelper, IUsuarioService usuarioService, IViewRender viewRender)
        {
            _clienteService = clienteService;
            _contratoHelper = contratoHelper;
            _contratoService = contratoService;
            _mapper = mapper;
            _pdfCreador = pdfCreador;
            _propiedadService = propiedadService;
            _responseHelper = responseHelper;
            _usuarioService = usuarioService;
            _viewRender = viewRender;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Contrato>))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get()
        {
            var contratos = await _contratoService.GetAll();

            contratos = contratos.Where(x => !x.Delete);

            return Json(contratos);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(List<Contrato>))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get(string id)
        {
            var respuestaDelServicio = await _contratoService.Get(new ObjectId(id));

            var contrato = _mapper.Map<ContratoDto>(respuestaDelServicio);

            return Ok(Json(contrato));
        }

        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Post(ContratoAgregarDto contrato)
        {
            var contratoParaAgregar = _mapper.Map<Contrato>(contrato);

            var respuestaDelServicio = await _contratoService.Insert(contratoParaAgregar);

            var contratoAgregado = _mapper.Map<ContratoDto>(respuestaDelServicio);

            return CreatedAtAction(nameof(Get), new { id = contratoAgregado.Id }, _responseHelper.ReturnOkResponse(contratoAgregado, "Elemento ingresado"));
        }

        [HttpPost("Update")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Update(Contrato contrato)
        {
            var ctr = await _contratoService.GetForQuery(contrato);

            if (ctr.Any())
            {
                var contratoAval = ctr.FirstOrDefault();
                Aval aval = new Aval();
                aval.CedulaIdentidad = contrato.Aval.CedulaIdentidad;
                aval.CorreoElectronico = contrato.Aval.CorreoElectronico;
                aval.Nombre = contrato.Aval.Nombre;
                aval.Domicilio = contrato.Aval.Domicilio;
                aval.Nacionalidad = contrato.Aval.Nacionalidad;
                aval.ProfesionOficio = contrato.Aval.ProfesionOficio;
                aval.EstadoCivil = contrato.Aval.EstadoCivil;

                contratoAval.Aval = aval;

                await _contratoService.Update(contratoAval);
                return Ok(Json(_responseHelper.ReturnOkResponse(null, "Elemento Actualizado")));
            }
            else
            {
                var contratoParaAgregar = _mapper.Map<Contrato>(contrato);
                var respuestaDelServicio = await _contratoService.Insert(contratoParaAgregar);

                if (string.IsNullOrWhiteSpace(respuestaDelServicio.Id.ToString()))
                {
                    return Ok(
                        Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(respuestaDelServicio.Id))));
                }
                return Ok(Json(_responseHelper.ReturnOkResponse(null, "Elemento Actualizado")));
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            if (!ModelState.IsValid) return BadRequest();

            var contratos = await _contratoService.GetAll();

            if (contratos.IsNullOrEmpty())
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var contrato = contratos.FirstOrDefault(x => x.Id.ToString() == id);

            if (contrato == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            contrato.Delete = true;

            await _contratoService.Update(contrato);

            return Ok(Json(_responseHelper.ReturnOkResponse(null, "Elemento Eliminado")));
        }

        [HttpPost("PostBuscarContrato")]
        [ProducesResponseType(200, Type = typeof(List<ContratoDto>))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> PostBuscarContrato(ContratoDto contratoDto)
        {
            if (contratoDto == null) return BadRequest();
            var contrato = _mapper.Map<Contrato>(contratoDto);
            var contratos = await _contratoService.PostBuscarContrato(contrato);
            if (contratos == null) return NotFound();
            return Json(contratos);
        }

        [HttpPost("GetPdfContratoDeArrendamiento")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetPdfContratoDeArrendamiento(ContratoArrendamientoAgregarDto ctr)
        {
            var contratoParaAgregar = _mapper.Map<Contrato>(ctr);

            var contratoCreado = await _contratoService.GetForQuery(contratoParaAgregar);

            string base64String = string.Empty;

            string idCtr = string.Empty;

            if (!contratoCreado.Any())
            {

                var respuestaDelServicio = await _contratoService.Insert(contratoParaAgregar);

                if (string.IsNullOrWhiteSpace(respuestaDelServicio.Id.ToString()))
                {
                    return Ok(
                        Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(respuestaDelServicio.Id))));
                }

                idCtr = respuestaDelServicio.Id.ToString();
            }
            else
            {
                idCtr = contratoCreado.FirstOrDefault().Id.ToString();
            }

            string id = idCtr;

            var contrato = await _contratoService.Get(new ObjectId(id));

            var arrendatario = await _clienteService.Get(new ObjectId(contrato.IdCliente));

            var arrendador = await _usuarioService.Get(new ObjectId(contrato.IdUsuario));

            var propiedad = await _propiedadService.Get(new ObjectId(contrato.IdPropiedad));

            var contratoDeArrendamiento =
                _contratoHelper.GetContratoDeArrendamiento(arrendatario, contrato, propiedad, arrendador);

            string contratoArrendamientoTemplateName =
                _contratoHelper.GetContratoArrendamientoTemplateName(contrato);

            var htmlContratoDeArrendamiento =
                await _viewRender.RenderToStringAsync($"~/Template/{contratoArrendamientoTemplateName}.cshtml",
                    contratoDeArrendamiento);

            var pdf = _pdfCreador.ConvertirHtmlAPdf(htmlContratoDeArrendamiento);

            base64String = Convert.ToBase64String(pdf);



            return Ok(Json(_responseHelper.ReturnOkResponse(base64String)));
        }

        [HttpPost("GetPdfPromesaDeCompraVenta")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetPdfPromesaDeCompraVenta(Contrato ctr)
        {
            var contratoParaAgregar = _mapper.Map<Contrato>(ctr);

            var contratoCreado = await _contratoService.GetForQuery(ctr);

            string base64String = string.Empty;

            string idCtr = string.Empty;

            if (!contratoCreado.Any())
            {
                var respuestaDelServicio = await _contratoService.Insert(contratoParaAgregar);

                if (string.IsNullOrWhiteSpace(respuestaDelServicio.Id.ToString()))
                {
                    return Ok(
                        Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(respuestaDelServicio.Id))));
                }
                idCtr = respuestaDelServicio.Id.ToString();
            }
            else
            {
                idCtr = contratoCreado.FirstOrDefault().Id.ToString();
            }

            string id = idCtr;

            var contrato = await _contratoService.Get(new ObjectId(id));

            var vendedor = await _clienteService.Get(new ObjectId(contrato.IdCliente));

            var comprador = await _usuarioService.Get(new ObjectId(contrato.IdUsuario));

            var propiedad = await _propiedadService.Get(new ObjectId(contrato.IdPropiedad));

            var codeudorSolidario = new Aval();

            var promesaDeCompraVenta = _contratoHelper.GetPromesaDeCompraVenta(vendedor, contrato, propiedad, comprador);

            string contratoPromesaCompraVentaTemplateName = _contratoHelper.GetPromesaDeCompraVentaTemplateName(contrato);

            var htmlPromesaDeCompraVenta = await _viewRender.RenderToStringAsync($"~/Template/{contratoPromesaCompraVentaTemplateName}.cshtml", promesaDeCompraVenta);

            var pdf = _pdfCreador.ConvertirHtmlAPdf(htmlPromesaDeCompraVenta);

            base64String = Convert.ToBase64String(pdf);

            return Ok(Json(_responseHelper.ReturnOkResponse(base64String)));
        }

    }
}