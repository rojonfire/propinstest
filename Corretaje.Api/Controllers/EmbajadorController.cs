using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Commons.Usuario;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Embajador;
using Corretaje.Api.Dto.Usuario;
using Corretaje.Api.Render;
using Corretaje.Domain;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IEmbajador;
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
    public class EmbajadorController : Controller
    {
        private readonly IEmbajadorService _embajadorService;
        private readonly IUsuarioService _usuarioService;
        private readonly IClienteService _clienteService;
        private readonly IResponseHelper _responseHelper;
        private readonly IMapper _mapper;
        private readonly IMapHelper _mapHelper;
        private readonly IViewRender _viewRender;
        private readonly IUsuarioHelper _usuarioHelper;

        public EmbajadorController(IEmbajadorService embajadorService, IUsuarioService usuarioService, IClienteService clienteService, IResponseHelper responseHelper, 
            IMapper mapper, IMapHelper mapHelper, IViewRender viewRender, IUsuarioHelper usuarioHelper)
        {
            _embajadorService = embajadorService;
            _usuarioService = usuarioService;
            _clienteService = clienteService;
            _responseHelper = responseHelper;
            _mapper = mapper;
            _mapHelper = mapHelper;
            _viewRender = viewRender;
            _usuarioHelper = usuarioHelper;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id))));
            }

            var embajador = await _embajadorService.Get(new ObjectId(id));

            if (embajador == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            return Json(_responseHelper.ReturnOkResponse(embajador));
        }

        [HttpPost("Referir")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> PostReferirEmbajador(ReferirEmbajadorDto embajadorDto)
        {
            embajadorDto.Email = embajadorDto.Email.ToLower();
            var usuarioEmbajador = _mapper.Map<Usuario>(embajadorDto);
            usuarioEmbajador.TipoCuenta = Estados.TipoCuenta.Usuario;
            usuarioEmbajador.EsVendedor = false;
            usuarioEmbajador.RegistroCompletado = false;
            usuarioEmbajador.Contactado = false;
            usuarioEmbajador.EsEmbajador = true;

            var loggedUser = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUser.Name;
            var usr = await _usuarioService.Get(ObjectId.Parse(userId));

            if (usr != null)
            {
                usuarioEmbajador.ReferidoPor = usr.Id.ToString();
            }

            var validacion = await _usuarioService.ValidarVendedor(usuarioEmbajador);

            if (validacion.Estado == Estados.Respuesta.Error)
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse(validacion.Mensaje));
            }

            var cliente = _mapHelper.MapUsuarioToCliente(usuarioEmbajador);

            var clienteCreado = await _clienteService.Add(cliente);

            usuarioEmbajador.ClienteId = clienteCreado.Id.ToString();

            var embajadorAgregado = await _usuarioService.AddUsuario(usuarioEmbajador);
            
            var usuarioEmail = _mapper.Map<UsuarioRegistroEmailDto>(embajadorAgregado);
            string mailHtmlCopiaJefeVentas = await _viewRender.RenderToStringAsync("~/Template/referido-embajador-copia-jefeventas.cshtml", usuarioEmail);
            _usuarioService.SendEmailEmbajadorReferidoCopiaJefeVentas(mailHtmlCopiaJefeVentas);

            usuarioEmail.Nombres = embajadorAgregado.Nombres;
            _usuarioHelper.SetUrlRegistroReferido(usuarioEmail);
            string mailHtmlVendedor = await _viewRender.RenderToStringAsync("~/Template/referido-vendedor.cshtml", usuarioEmail);
            _usuarioService.SendEmailVendedorReferido(mailHtmlVendedor, usuarioEmail.Email);
            
            return Ok(_responseHelper.ReturnOkResponse(embajadorAgregado, "Elemento Ingresado"));
        }

        
    }
}