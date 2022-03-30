using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Commons.SecurityHelper;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Proper;
using Corretaje.Api.Dto.Usuario;
using Corretaje.Api.Render;
using Corretaje.Common.EMail;
using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices.IProper;
using Corretaje.Service.IServices.IPropiedad;
using Corretaje.Service.IServices.IUsuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Corretaje.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProperController : Controller
    {
        private readonly IProperService _properService;
        private readonly IReferidoService _referidoService;
        private readonly IEncriptacionHelper _encriptacionHelper;
        private readonly IMapper _mapper;
        private readonly IResponseHelper _responseHelper;
        private readonly IUsuarioService _usuarioService;
        private readonly IPropiedadService _propiedadService;
        private readonly IViewRender _viewRender;
        private readonly IEMailService _eMailService;
        private readonly IRepository<ProyectoInmobiliario> _proyectoInmobiliarioRepository;
        private readonly UsuarioCrearCuentaDto _usuarioCrearCuentaDto = new UsuarioCrearCuentaDto();

        private readonly ITokenHelper _tokenHelper;

        public ProperController(IProperService properService, IEncriptacionHelper encriptacionHelper, IMapper mapper,
            IResponseHelper responseHelper, IUsuarioService usuarioService, ITokenHelper tokenHelper,
            IPropiedadService propiedadService, IEMailService eMailService, IViewRender viewRender,
            IRepository<ProyectoInmobiliario> proyectoInmobiliarioRepository, IReferidoService referidoService)
        {
            _properService = properService;
            _encriptacionHelper = encriptacionHelper;
            _mapper = mapper;
            _responseHelper = responseHelper;
            _usuarioService = usuarioService;
            _tokenHelper = tokenHelper;
            _propiedadService = propiedadService;
            _eMailService = eMailService;
            _viewRender = viewRender;
            _proyectoInmobiliarioRepository = proyectoInmobiliarioRepository;
            _referidoService = referidoService;
        }

        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Post(ProperDto proper)
        {
            _usuarioCrearCuentaDto.Nombres = proper.Nombres;
            _usuarioCrearCuentaDto.Apellidos = proper.Apellidos;
            _usuarioCrearCuentaDto.Rut = proper.Rut;
            _usuarioCrearCuentaDto.Direccion = proper.Direccion;
            _usuarioCrearCuentaDto.Telefono = proper.Telefono;

            proper.Password = _encriptacionHelper.GenerarMd5Hash(proper.Password);
            _usuarioCrearCuentaDto.Password = proper.Password;
            proper.Email = proper.Email.ToLowerInvariant();
            _usuarioCrearCuentaDto.Email = proper.Email;

            var properCrear = _mapper.Map<Propers>(proper);

            var validacionProper = await _properService.Validar(properCrear);

            if (validacionProper.Estado == Estados.Respuesta.Error)
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponse(validacionProper.Mensaje)));
            }

            var usuarioCrear = _mapper.Map<Usuario>(_usuarioCrearCuentaDto);
            var validacionUsuario = await _usuarioService.Validar(usuarioCrear);
            if (validacionUsuario.Estado == Estados.Respuesta.Error)
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponse(validacionUsuario.Mensaje)));
            }

            var properCreado = await _properService.AddProper(properCrear);

            usuarioCrear.ProperId = properCreado.Id;
            usuarioCrear.TipoCuenta = Estados.TipoCuenta.Proper;
            await _usuarioService.AddUsuario(usuarioCrear);

            var mailHtml = await _viewRender.RenderToStringAsync("~/Template/BienvenidaEmbajador.cshtml", proper);

            var mail = new EMail
            {
                Content = mailHtml,
                FromAddress = "contacto@propins.cl",
                Subject = $"Hola {proper.Nombres} bienvenido a propins, la nueva forma de ganar dinero.",
                ToAddresses = new List<string> {proper.Email}
            };

            _eMailService.Send(mail);

            var properEmail = _mapper.Map<ProperRegistroEmailDto>(properCreado);
            string mailHtmlCopiaJefeVentas = await _viewRender.RenderToStringAsync("~/Template/registro-embajador-copia-jefeventas.cshtml", properEmail);
            _usuarioService.SendEmailRegistroCopiaJefeVentas(mailHtmlCopiaJefeVentas);

            return Ok(Json(_responseHelper.ReturnOkResponse(properCreado, "Elemento Ingresado")));
        }

        [AllowAnonymous]
        [HttpPost("LoginProperWeb")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> LoginProperWeb(LoginCredencialesDto credenciales)
        {
            var prop = await _properService.GetByLogin(_encriptacionHelper.GenerarMd5Hash(credenciales.Password),
                credenciales.Email);

            if (prop == null)
            {
                return Ok(Json(_responseHelper.ReturnErrorResponse(null,
                    "El correo o contraseña que ingresaste son incorrectos.")));
            }

            var proper = new UsuarioLogin
            {
                Nombres = prop.Nombres + " " + prop.Apellidos,
                Mail = prop.Email,
                Rut = prop.Rut,
                Token = _tokenHelper.GenerarTokenUsuarioRecuperarContraseña(prop.Id.ToString()),
                Telefono = prop.Telefono
            };

            return Ok(Json(_responseHelper.ReturnOkResponse(proper, "Embajador Correcto")));
        }

        [HttpPost("UpdateProper")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Update(ProperDto proper)
        {
            proper.Referidos.Referencias = new List<string>();
            var refe = _mapper.Map<ReferidoProper>(proper.Referidos);
            var prop = await _properService.AgregarReferido(ObjectId.Parse(proper.ProperId), refe);

            return Json(_responseHelper.ReturnOkResponse(prop, "Elemento Actualizado"));
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
        }

        [HttpGet("GetProperById/{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get(string id)
        {
            var prop = await _properService.Get(ObjectId.Parse(id));

            return Ok(prop == null
                ? Json(_responseHelper.ReturnErrorResponse(null, "Error al traer los datos"))
                : Json(_responseHelper.ReturnOkResponse(prop)));
        }

        [HttpGet("GetReferidoById/{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetReferido(string id)
        {
            var refe = await _referidoService.Get(ObjectId.Parse(id));

            return Ok(refe == null
                ? Json(_responseHelper.ReturnErrorResponse(null, "Error al traer los datos"))
                : Json(refe));
        }

        [HttpPost("UpdateReferido")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> ActualizarReferido(ReferidoDto referido)
        {
            var refe = await _referidoService.Get(ObjectId.Parse(referido.Id));
            refe.Nombre = referido.Nombres;
            refe.Apellido = referido.Apellido;
            refe.Mail = referido.Mail;
            refe.Telefono = referido.Telefono;
            refe.Rut = referido.Rut;
            refe.Edad = referido.Edad;
            refe.Comuna = referido.Comuna;
            refe.Paso2 = true;

            await _properService.ActualizarPasoReferido(refe);
            var result = await _referidoService.Update(refe);
           
            return Json(_responseHelper.ReturnOkResponse(result));
        }

        [HttpPost("Referir")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Referir(ReferirProperDto referirProper)
        {
            referirProper.Propiedades = new List<Propiedad>();
            referirProper.Proyectos = new List<ProyectoInmobiliario>();

            var prop = await _properService.ReferirProps(referirProper.ProperId, referirProper.Email,
                referirProper.Referencias);

            var refeProper = _properService.GetReferidoByEmail(referirProper.Email, prop);

            var refeSingle = await _referidoService.GetByEmail(refeProper.Email);

            referirProper.ReferidoId = refeSingle.Id;


            foreach (var props in referirProper.Referencias)
            {
                var propAgregar = await _propiedadService.Get(ObjectId.Parse(props));
                if (propAgregar != null)
                {
                    referirProper.Propiedades.Add(propAgregar);
                }
                else
                {
                    referirProper.Proyectos.Add(await _proyectoInmobiliarioRepository.Get(ObjectId.Parse(props)));
                }
            }

            string EmailHtml = await _viewRender.RenderToStringAsync("~/Template/Referir.cshtml", referirProper);

            var mail = new EMail
            {
                Content = EmailHtml,
                FromAddress = "contacto@propins.cl",
                Subject = $"{referirProper.Nombres}, {referirProper.NombreProper} te refirio",
                ToAddresses = new List<string> {referirProper.Email}
            };
            _eMailService.Send(mail);

            return Ok();
        }
    }
}