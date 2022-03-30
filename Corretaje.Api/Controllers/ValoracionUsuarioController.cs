using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.ValoracionUsuario;
using Corretaje.Common.Extension;
using Corretaje.Domain;
using Corretaje.Service.IServices.IValoracionUsuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValoracionUsuarioController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IResponseHelper _responseHelper;
        private readonly IValoracionUsuarioService _valoracionUsuarioService;

        public ValoracionUsuarioController(IMapper mapper, IResponseHelper responseHelper, IValoracionUsuarioService valoracionUsuarioService)
        {
            _mapper = mapper;
            _responseHelper = responseHelper;
            _valoracionUsuarioService = valoracionUsuarioService;
        }

        [HttpGet("GetCasosDeExito")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetCasosDeExito()
        {
            var respuestaDelServicio = await _valoracionUsuarioService.GetCasosDeExito();

            if (respuestaDelServicio.IsNullOrEmpty())
            {
                return NotFound(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var casosDeExito = _mapper.Map<IEnumerable<ValoracionUsuarioDto>>(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(casosDeExito)));
        }

        [HttpPost("AddValoracionUsuario")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AddValoracionUsuario(AgregarValoracionUsuarioDto valoracionUsuario)
        {
            var valoracionUsuarioParaAgregar = _mapper.Map<ValoracionUsuario>(valoracionUsuario);

            valoracionUsuarioParaAgregar.Nota = 100;

            var respuestaDelServicio = await _valoracionUsuarioService.AddValoracionUsuario(valoracionUsuarioParaAgregar);

            var valoracionDeUsuarioAgregada = _mapper.Map<ValoracionUsuarioDto>(respuestaDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(valoracionDeUsuarioAgregada)));
        }
    }
}