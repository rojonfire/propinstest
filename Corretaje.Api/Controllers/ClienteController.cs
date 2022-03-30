using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto.Cliente;
using Corretaje.Domain;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IUsuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using MongoDB.Bson;
using Corretaje.Api.Dto;

namespace Corretaje.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IClienteService _clienteService;
        private readonly IResponseHelper _responseHelper;
        private readonly IUsuarioService _usuarioService;

        public ClienteController(IClienteService clienteService, IMapper mapper, IResponseHelper responseHelper, IUsuarioService usuarioService)
        {
            _clienteService = clienteService;
            _mapper = mapper;
            _responseHelper = responseHelper;
            _usuarioService = usuarioService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Cliente>))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get()
        {
            var clientes = await _clienteService.GetAll();
            return Json(clientes);
        }

        [HttpPost]
        [ProducesResponseType(200, Type = typeof(Cliente))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Post(Cliente cliente)
        {
            if (!ModelState.IsValid) return BadRequest();

            var clienteAgregado = await _clienteService.Add(cliente);

            var usuario = await _usuarioService.GetByEmail(clienteAgregado.Mail);

            usuario.ClienteId = clienteAgregado.Id.ToString();

            await _usuarioService.Update(usuario);

            return Ok(Json(_responseHelper.ReturnOkResponse(null, "Elemento Ingresado")));
        }

        [HttpPut]
        [ProducesResponseType(200, Type = typeof(Cliente))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Update(ClienteDto cliente)
        {
            var clienteActualizar = _mapper.Map<Cliente>(cliente);

            await _clienteService.Update(clienteActualizar);

            return Ok(Json(_responseHelper.ReturnOkResponse(null, "Cliente actualizado")));
        }
    }
}