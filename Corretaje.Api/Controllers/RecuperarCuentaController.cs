using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.RecuperarCuenta;
using Corretaje.Api.Render;
using Corretaje.Domain;
using Corretaje.Service.IServices.IRecuperarCuenta;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecuperarCuentaController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IRecuperarCuentaService _recuperarCuentaService;
        private readonly IResponseHelper _responseHelper;
        private readonly IViewRender _viewRender;

        public RecuperarCuentaController(IMapper mapper, IRecuperarCuentaService recuperarCuentaService, IResponseHelper responseHelper, IViewRender viewRender)
        {
            _mapper = mapper;
            _recuperarCuentaService = recuperarCuentaService;
            _responseHelper = responseHelper;
            _viewRender = viewRender;
        }

        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> RecuperarCuentaAdd(RecuperarCuentaAgregarDto recuperarCuenta)
        {
            var recuperarCuentaToAdd = _mapper.Map<RecuperarCuenta>(recuperarCuenta);

            var validacion = await _recuperarCuentaService.Validar(recuperarCuentaToAdd);

            if (validacion.Estado == Estados.Respuesta.Error)
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponse(validacion.Mensaje)));
            }

            var respuestaDelServicio = await _recuperarCuentaService.Add(recuperarCuentaToAdd);

            var recuperarCuentaAdded = _mapper.Map<RecuperarCuentaDto>(respuestaDelServicio);

            string recuperarCuentaEmailHtml = await _viewRender.RenderToStringAsync("~/Template/RecuperarContraseña.cshtml", recuperarCuentaAdded);

            _recuperarCuentaService.SendMail(respuestaDelServicio, recuperarCuentaEmailHtml);

            return Ok(Json(_responseHelper.ReturnOkResponse(recuperarCuentaAdded)));
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id))));
            }

            var respuestaDelServicio = await _recuperarCuentaService.GetByGuid(id);

            var recuperarCuenta = _mapper.Map<RecuperarCuentaDto>(respuestaDelServicio);

            await _recuperarCuentaService.Expirar(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(recuperarCuenta)));
        }
    }
}