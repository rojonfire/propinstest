using AutoMapper;
using Corretaje.Domain;
using Corretaje.Api.Commons;
using Corretaje.Api.Commons.SecurityHelper;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.OrdenCompra;
using Corretaje.Api.Dto.Usuario;
using Corretaje.Common.Extension;
using Corretaje.Service.IServices.ILogin;
using Corretaje.Service.IServices.IOrdenCompra;
using Corretaje.Service.IServices.IUsuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using MongoDB.Driver;
using Corretaje.Repository;
using Microsoft.AspNetCore.Cors;
using System.Security.Claims;
using Corretaje.Service.IServices;
using Corretaje.Api.Render;
using Corretaje.Api.Dto.Proper;
using Corretaje.Api.Commons.Usuario;

namespace Corretaje.Api.Controllers
{
    //[Authorize]
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private readonly IEncriptacionHelper _encriptacionHelper;
        private readonly ILoginService _loginService;
        private readonly IMapper _mapper;
        private readonly IOrdenCompraService _ordenCompraService;
        private readonly IResponseHelper _responseHelper;
        private readonly ITokenHelper _tokenHelper;
        private readonly IUsuarioService _usuarioService;
        private readonly IOptions<VisionDto> _configuration;
        private readonly IRepository<Usuario> _usuarioRepository;
        private readonly IClienteService _clienteService;
        private readonly IMapHelper _mapHelper;
        private readonly IViewRender _viewRender;
        private readonly IUsuarioHelper _usuarioHelper;

        public UsuarioController(IEncriptacionHelper encriptacionHelper,
            ILoginService loginService,
            IMapper mapper, IOrdenCompraService ordenCompraService,
            IResponseHelper responseHelper, ITokenHelper tokenHelper,
            IUsuarioService usuarioService, IOptions<VisionDto> configuration,
            IRepository<Usuario> usuarioRepository, IClienteService clienteService,
            IMapHelper mapHelper, IViewRender viewRender, IUsuarioHelper usuarioHelper)
        {
            _encriptacionHelper = encriptacionHelper;
            _loginService = loginService;
            _mapper = mapper;
            _ordenCompraService = ordenCompraService;
            _responseHelper = responseHelper;
            _tokenHelper = tokenHelper;
            _usuarioService = usuarioService;
            _configuration = configuration;
            _usuarioRepository = usuarioRepository;
            _clienteService = clienteService;
            _mapHelper = mapHelper;
            _viewRender = viewRender;
            _usuarioHelper = usuarioHelper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get()  
        {
            var usuarios = await _usuarioService.GetAll();
            //var data = _mapper.Map<IEnumerable<UsuarioDto>>(usuarios);
            return Json(_responseHelper.ReturnOkResponse(usuarios));
        }

        [HttpGet("ListarUsuarios")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetUsuariosPaginados(int pageSize = 10, int page = 1, int tipoCuenta = -1, string referidoPor = null, bool soloEmbajadores = false)
        {
            var usuarios = await _usuarioService.GetUsuariosPaginados(pageSize, page, tipoCuenta, referidoPor, soloEmbajadores);
            //var data = _mapper.Map<IEnumerable<UsuarioDto>>(usuarios);
            return Ok(_responseHelper.ReturnOkResponse(usuarios, "Se han encontrado resultados para su búsqueda"));
        }

        [HttpGet("GetUsuariosByAdminInmobiliariaId")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetUsuariosByAdminInmobiliariaId(string usuarioId)
        {
            var user = await _usuarioService.Get(new ObjectId(usuarioId));

            if (string.IsNullOrWhiteSpace(user.InmobiliariaId))
                return Ok(_responseHelper.ReturnBadRequestResponseByMissingId("InmobiliariaId no puede ser nulo"));

            var filter =
                Builders<Usuario>.Filter.Where(usuario => usuario.InmobiliariaId == user.InmobiliariaId);
            var usuarios =
                await _usuarioRepository.SearchFor(filter);

            if (usuarios.IsNullOrEmpty())
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            var data = _mapper.Map<IEnumerable<UsuarioDto>>(usuarios);
            return Json(_responseHelper.ReturnOkResponse(data));
        }

        [HttpGet("GetUsuarioById/{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get(string id)
        {
            var usr = await _usuarioService.Get(ObjectId.Parse(id));

            if (usr == null)
            {
                return Ok(Json(_responseHelper.ReturnErrorResponse(null,
                    "El correo o contraseña que ingresaste son incorrectos.")));
            }

            var usuario = new UsuarioLogin
            {
                Nombres = usr.Nombres,
                Apellidos = usr.Apellidos,
                Mail = usr.Email,
                userId = usr.Id.ToString(),
                Rut = usr.Rut,
                verificaCedula = usr.VerificacionCedula,
                Domicilio = usr.Direccion,
                FechaNacimiento = usr?.FechaNacimiento.ToString(CultureInfo.InvariantCulture),
                Pais = usr.Nacionalidad,
                Oficio = usr.Oficio,
                EstadoCivil = usr.EstadoCivil,
                Telefono = usr.Telefono,
                ClienteId = usr.ClienteId,
                ProperId = usr.ProperId.ToString(),
                EsEmbajador = usr.EsEmbajador
            };

            var ordenCompra = await _ordenCompraService.GetOrdenesCompraLogin(id);

            if (ordenCompra != null)
            {
                usuario.OrdenCompra = _mapper.Map<IEnumerable<OrdenCompraUsuarioLoginDto>>(ordenCompra);
            }

            return Ok(Json(_responseHelper.ReturnOkResponse(usuario)));
        }

        [HttpGet("vendedores")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetVendedores(int pageSize = 10, int page = 1)
        {
            var vendedores = await _usuarioService.GetByEsVendedor(pageSize, page, true);
            return Ok(Json(_responseHelper.ReturnOkResponse(vendedores)));
        }

        [Authorize]
        [HttpGet("GetUsuario")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetUsuario()
        {
            var loggedUser = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUser.Name;

            var usr = await _usuarioService.Get(ObjectId.Parse(userId));

            if (usr == null)
            {
                return Ok(Json(_responseHelper.ReturnErrorResponse(null,
                    "No se ha encontrado el usuario solicitado")));
            }

            var usuario = new UsuarioLogin
            {
                Nombres = usr.Nombres,
                Apellidos = usr.Apellidos,
                Mail = usr.Email,
                userId = usr.Id.ToString(),
                Rut = usr.Rut,
                verificaCedula = usr.VerificacionCedula,
                Domicilio = usr.Direccion,
                FechaNacimiento = usr?.FechaNacimiento.ToString(CultureInfo.InvariantCulture),
                Pais = usr.Nacionalidad,
                Oficio = usr.Oficio,
                EstadoCivil = usr.EstadoCivil,
                Telefono = usr.Telefono,
                ClienteId = usr.ClienteId,
                ProperId = usr.ProperId.ToString(),
                TipoCuenta = usr.TipoCuenta,
                EsEmbajador = usr.EsEmbajador,
                DatosBancarios = usr.DatosBancarios
            };

            return Ok(Json(_responseHelper.ReturnOkResponse(usuario)));
        }

        [HttpGet("GetUsuarioPorRol")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Usuario>))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetUsuarioPorRol(string rol)
        {
            var usuarios = await _usuarioService.GetUsuariosByOficio(rol);

            return Ok(usuarios.IsNullOrEmpty()
                ? Json(_responseHelper.ReturnNotFoundResponse())
                : Json(_responseHelper.ReturnOkResponse(usuarios)));
        }

        [AllowAnonymous]
        [HttpPost("LoginUsuarioWeb")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> LoginUsuarioWeb(LoginCredencialesDto credenciales)
        {
            var usr = await _usuarioService.GetByLogin(_encriptacionHelper.GenerarMd5Hash(credenciales.Password),
                credenciales.Email);

            if (usr == null)
            {
                return Ok(Json(_responseHelper.ReturnErrorResponse(null,
                    "El correo o contraseña que ingresaste son incorrectos.")));
            }

            string IdCliente = "";

            if (usr.ClienteId != null)
            {
                var cliente = await _clienteService.Get(new ObjectId(usr.ClienteId));
                if (cliente == null)
                {
                    cliente = _mapHelper.MapUsuarioToCliente(usr);
                    var respuesta = await _clienteService.Add(cliente);

                    IdCliente = respuesta.Id.ToString();
                } else
                {
                    IdCliente = cliente.Id.ToString();
                }

            } else
            {
                var cliente = _mapHelper.MapUsuarioToCliente(usr);
                var respuesta = await _clienteService.Add(cliente);

                usr.ClienteId = respuesta.Id.ToString();
                if (usr.TipoCuenta == Estados.TipoCuenta.Proper)
                {
                    usr.EsEmbajador = true;
                }
                var respuestaUser = await _usuarioService.Update(usr);
                IdCliente = respuesta.Id.ToString();
            }

            var user = new UsuarioLogin
            {
                Nombres = usr.Nombres + " " + usr.Apellidos,
                Mail = usr.Email,
                userId = usr.Id.ToString(),
                Rut = usr.Rut,
                Token = _tokenHelper.GenerarTokenUsuarioLogin(usr.Id.ToString()),
                verificaCedula = usr.VerificacionCedula,
                ClienteId = IdCliente,
                Telefono = usr.Telefono,
                Version = usr.Version,
                ProperId = usr.ProperId.ToString(),
                TipoCuenta = usr.TipoCuenta,
                EsEmbajador = usr.EsEmbajador
            };

            return Ok(Json(_responseHelper.ReturnOkResponse(user, "Usuario Correcto")));
        }

        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Post(UsuarioCrearCuentaDto usuario)
        {
            usuario.Password = _encriptacionHelper.GenerarMd5Hash(usuario.Password);
            usuario.Email = usuario.Email.ToLower();

            var usuarioCrear = _mapper.Map<Domain.Usuario>(usuario);
            usuarioCrear.TipoCuenta = Estados.TipoCuenta.Usuario;
            usuarioCrear.RegistroCompletado = true;
            usuarioCrear.Contactado = false;

            var creadoDesdeAdmin = false;

            if (usuario.UsuarioReferidoId != null)
            {
                usuarioCrear.Id = ObjectId.Parse(usuario.UsuarioReferidoId);
                usuarioCrear.TipoCuenta = Estados.TipoCuenta.Referido;
            } else
            {
                var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
                string userId = loggedUserClaims.Name;

                if (userId != null)
                {
                    var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

                    if (loggedUser.TipoCuenta == Estados.TipoCuenta.Administrador || loggedUser.TipoCuenta == Estados.TipoCuenta.JefeDeVentas
                        || loggedUser.TipoCuenta == Estados.TipoCuenta.Broker)
                    {
                        usuarioCrear.TipoCuenta = (Estados.TipoCuenta)usuario.TipoCuenta;
                        creadoDesdeAdmin = true;
                    }
                }
            }

            var validacion = await _usuarioService.Validar(usuarioCrear);

            if (validacion.Estado == Estados.Respuesta.Error)
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse(validacion.Mensaje));
            }

            var cliente = await _clienteService.GetClienteByEmail(usuario.Email);
            Cliente clienteCreado;
            if (cliente != null)
            {
                cliente.Nombres = usuario.Nombres;
                cliente.Apellidos = usuario.Apellidos;
                cliente.Direccion = usuario.Direccion;
                cliente.Mail = usuario.Email;
                cliente.Rut = usuario.Rut;
                cliente.Telefono = usuario.Telefono;
                clienteCreado = await _clienteService.Update(cliente);
            }
            else
            {
                cliente = _mapHelper.MapUsuarioToCliente(usuarioCrear);

                clienteCreado = await _clienteService.Add(cliente);
            }            

            usuarioCrear.ClienteId = clienteCreado.Id.ToString();

            var verificarUser = await _usuarioService.GetByEmail(usuario.Email);

            if (verificarUser != null)
            {
                //si el mail ya existe, y se hizo la validacion, entonces es un usuario que no ha completado su registro
                //por lo que se debe actualizar el usuario
                usuarioCrear.Id = verificarUser.Id;
                usuarioCrear.CreatedAt = verificarUser.CreatedAt;
                usuarioCrear.ReferidoPor = verificarUser.ReferidoPor;
                var usuarioCreado = await _usuarioService.Update(usuarioCrear);

                //registrado desde web cliente
                if (!creadoDesdeAdmin)
                {
                    var usuarioEmail = _mapper.Map<UsuarioRegistroEmailDto>(usuarioCreado);
                    string mailHtml = await _viewRender.RenderToStringAsync("~/Template/registro-usuario-copia-jefeventas.cshtml", usuarioEmail);
                    _usuarioService.SendEmailRegistroCopiaJefeVentas(mailHtml);
                }

                return Ok(_responseHelper.ReturnOkResponse(usuarioCreado, "Elemento Ingresado"));
            }
            else
            {
                var usuarioCreado = await _usuarioService.AddUsuario(usuarioCrear);

                //registrado desde web cliente
                if (!creadoDesdeAdmin)
                {
                    var usuarioEmail = _mapper.Map<UsuarioRegistroEmailDto>(usuarioCreado);
                    string mailHtml = await _viewRender.RenderToStringAsync("~/Template/registro-usuario-copia-jefeventas.cshtml", usuarioEmail);
                    _usuarioService.SendEmailRegistroCopiaJefeVentas(mailHtml);
                }

                return Ok(_responseHelper.ReturnOkResponse(usuarioCreado, "Elemento Ingresado"));
            }

        }

        [AllowAnonymous]
        [HttpPost("ReferirVendedor")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> PostVendedor(UsuarioReferirVendedorDto usuario)
        {
            usuario.Email = usuario.Email.ToLower();

            var usuarioCrear = _mapper.Map<Usuario>(usuario);
            usuarioCrear.TipoCuenta = Estados.TipoCuenta.Usuario;
            usuarioCrear.EsVendedor = true;
            usuarioCrear.RegistroCompletado = false;
            usuarioCrear.Contactado = false;

            var loggedUser = HttpContext.User.Identity as ClaimsIdentity;

            if (loggedUser != null && loggedUser.Name != null)
            {
                string userId = loggedUser.Name;

                var usr = await _usuarioService.Get(ObjectId.Parse(userId));

                if (usr != null)
                {
                    usuarioCrear.ReferidoPor = usr.Id.ToString();
                }

            }            

            var validacion = await _usuarioService.ValidarVendedor(usuarioCrear);

            if (validacion.Estado == Estados.Respuesta.Error)
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse(validacion.Mensaje));
            }
            
            var cliente = _mapHelper.MapUsuarioToCliente(usuarioCrear);

            var clienteCreado = await _clienteService.Add(cliente);

            usuarioCrear.ClienteId = clienteCreado.Id.ToString();
            
            var usuarioCreado = await _usuarioService.AddUsuario(usuarioCrear);

            var usuarioEmail = _mapper.Map<UsuarioRegistroEmailDto>(usuarioCreado);
            string mailHtmlCopiaJefeVentas = await _viewRender.RenderToStringAsync("~/Template/referido-vendedor-copia-jefeventas.cshtml", usuarioEmail);
            _usuarioService.SendEmailVendedorReferidoCopiaJefeVentas(mailHtmlCopiaJefeVentas);

            usuarioEmail.Nombres = usuarioCreado.Nombres;
            _usuarioHelper.SetUrlRegistroReferido(usuarioEmail);
            string mailHtmlVendedor = await _viewRender.RenderToStringAsync("~/Template/referido-vendedor.cshtml", usuarioEmail);
            _usuarioService.SendEmailVendedorReferido(mailHtmlVendedor, usuarioEmail.Email);

            return Ok(_responseHelper.ReturnOkResponse(usuarioCreado, "Elemento Ingresado"));
        }

        [AllowAnonymous]
        [HttpPost("UsuarioByEmail")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UsuarioByEmail(string mail, string token)
        {
            if (!ModelState.IsValid) return BadRequest();

            if (!await _loginService.FacebookTokenUsuarioEsValido(token))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponse("token facebook no válido")));
            }

            var usr = await _usuarioService.GetByEmail(mail);
            var user = new UsuarioLogin
            {
                Nombres = usr?.Nombres + " " + usr?.Apellidos,
                Mail = usr?.Email,
                userId = usr?.Id.ToString(),
                Rut = usr?.Rut,
                Token = _tokenHelper.GenerarTokenUsuarioLogin(usr?.Id.ToString()),
                Telefono = usr?.Telefono,
                ClienteId = usr?.ClienteId
            };
            return Ok(Json(_responseHelper.ReturnOkResponse(user, "Secuencia Correcta")));
        }

        [AllowAnonymous]
        [HttpPost("UsuarioByGmail")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UsuarioByGmail(string mail, string token)
        {
            if (!ModelState.IsValid) return BadRequest();

            if (!await _loginService.GoogleTokenUsuarioEsValido(token))
            {
                return Ok(_responseHelper.ReturnBadRequestResponse("token google no válido"));
            }

            var usr = await _usuarioService.GetByEmail(mail);

            if (usr == null) return Ok(_responseHelper.ReturnNotFoundResponse());

            var user = new UsuarioLogin
            {
                Nombres = usr?.Nombres + " " + usr?.Apellidos,
                Mail = usr?.Email,
                userId = usr?.Id.ToString(),
                Rut = usr?.Rut,
                Token = _tokenHelper.GenerarTokenUsuarioLogin(usr?.Id.ToString()),
                Telefono = usr?.Telefono,
                ClienteId = usr?.ClienteId
            };
            return Ok(_responseHelper.ReturnOkResponse(user, "Secuencia Correcta"));
        }

        [HttpGet("FiltrarUsuarios")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UsuarioByTipoCuenta(string tipocuenta)
        {
            if (tipocuenta == null) return BadRequest();

            Estados.TipoCuenta tipoCuentaValue = (Estados.TipoCuenta)Convert.ToInt32(tipocuenta);

            var users = await _usuarioService.GetUsuariosByTipoCuenta(tipoCuentaValue);

            return Ok(_responseHelper.ReturnOkResponse(users, "Secuencia Correcta"));
        }


        [HttpPost("UpdateUsuario")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Update(Usuario usuario)
        {
            var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUserClaims.Name;

            var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

            Usuario userToUpdate;

            if (usuario.IdString != null)
            {
                if (loggedUser.TipoCuenta == Estados.TipoCuenta.Administrador || loggedUser.TipoCuenta == Estados.TipoCuenta.JefeDeVentas 
                    || loggedUser.TipoCuenta == Estados.TipoCuenta.Broker)
                {
                    userToUpdate = await _usuarioService.Get(ObjectId.Parse(usuario.IdString));
                    userToUpdate.TipoCuenta = usuario.TipoCuenta;
                    userToUpdate.InmobiliariaId = usuario.InmobiliariaId;
                    userToUpdate.ProyectosInmobiliariosId = usuario.ProyectosInmobiliariosId;
                    userToUpdate.TipoCuenta = usuario.TipoCuenta;
                    userToUpdate.EstadoCivil = usuario.EstadoCivil;
                    userToUpdate.FechaNacimiento = usuario.FechaNacimiento;
                    userToUpdate.Direccion = usuario.Direccion;
                    userToUpdate.Oficio = usuario.Oficio;
                    userToUpdate.Nacionalidad = usuario.Nacionalidad;
                    if (usuario.Password != null)
                    {
                        userToUpdate.Password = usuario.Password;
                    }

                } else
                {
                    return Forbid();
                }
            } else
            {
                userToUpdate = loggedUser;
            }

            userToUpdate.Apellidos = usuario.Apellidos;
            userToUpdate.Nombres = usuario.Nombres;
            userToUpdate.Telefono = usuario.Telefono;
            userToUpdate.DatosBancarios = usuario.DatosBancarios;
            userToUpdate.RegistroCompletado = true;

            if (userToUpdate.Email.ToLower() != usuario.Email.ToLower())
            {
                var usuarioExistenteEmail = await _usuarioService.GetByEmail(usuario.Email);
                if (usuarioExistenteEmail != null)
                {
                    return BadRequest(_responseHelper.ReturnBadRequestResponse("Ya existe un usuario con ese email"));
                } else
                {
                    userToUpdate.Email = usuario.Email;
                }
            }

            if (userToUpdate.Rut != usuario.Rut)
            {
                var usuarioExistenteRut = await _usuarioService.GetByRut(usuario.Rut);
                if (usuarioExistenteRut != null)
                {
                    return BadRequest(_responseHelper.ReturnBadRequestResponse("Ya existe un usuario con ese rut"));
                } else
                {
                    userToUpdate.Rut = usuario.Rut;
                }
            }

            await _usuarioService.Update(userToUpdate);

            var clienteUpdatedData = _mapHelper.MapUsuarioToCliente(userToUpdate);
            if (userToUpdate.ClienteId != null)
            {
                var clienteToUpdate = await _clienteService.Get(new ObjectId(userToUpdate.ClienteId));
                clienteUpdatedData.Id = new ObjectId(userToUpdate.ClienteId);
                clienteUpdatedData.Version = clienteToUpdate.Version;
                clienteUpdatedData.UpdatedAt = clienteToUpdate.UpdatedAt;
                clienteUpdatedData.CreatedAt = clienteToUpdate.CreatedAt;
                await _clienteService.Update(clienteUpdatedData);
            }
            else
            {
                await _clienteService.Add(clienteUpdatedData);
            }

            return Ok(_responseHelper.ReturnOkResponse("Elemento Actualizado"));
        }

        [AllowAnonymous]
        [HttpPost("RestablecerContraseña")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> RestablecerContraseña(string password, string email)
        {
            var resultadoDelServicio =
                await _usuarioService.RestablecerContraseña(_encriptacionHelper.GenerarMd5Hash(password), email);

            var usuario = _mapper.Map<UsuarioDto>(resultadoDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(usuario, "contraseña actualizada")));
        }

        [HttpPost("CambiarContraseña")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> CambiarContraseña(UsuarioCambiarContraseñaDto datos)
        {
            var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUserClaims.Name;

            var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

            if (loggedUser == null)
            {
                return BadRequest(_responseHelper.ReturnNotFoundResponse());
            }

            var usr = await _usuarioService.GetByLogin(_encriptacionHelper.GenerarMd5Hash(datos.contraseñaAntigua),
                loggedUser.Email);

            if (usr == null)
            {
                return BadRequest(Json(_responseHelper.ReturnErrorResponse(null,
                    "La contraseña antigua ingresada es incorrecta")));
            }

            var resultadoDelServicio =
                await _usuarioService.RestablecerContraseña(_encriptacionHelper.GenerarMd5Hash(datos.contraseñaNueva), loggedUser.Email);

            string mailHtml = await _viewRender.RenderToStringAsync("~/Template/notificacion-cambio-contraseña.cshtml", null);
            _usuarioService.SendEmailNotificacionCambioContraseña(mailHtml, loggedUser.Email);

            var usuario = _mapper.Map<UsuarioDto>(resultadoDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(usuario, "Contraseña actualizada")));
        }

        [HttpPut("CambiarContactado")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> CambiarContactado(string idUsuario)
        {
            var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUserClaims.Name;

            var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

            if (loggedUser == null)
            {
                return Unauthorized();
            }

            if (loggedUser.TipoCuenta != Estados.TipoCuenta.JefeDeVentas && loggedUser.TipoCuenta != Estados.TipoCuenta.Administrador)
            {
                return Forbid();
            }

            var usuario = await _usuarioService.Get(ObjectId.Parse(idUsuario));

            if (usuario == null)
            {
                return BadRequest(_responseHelper.ReturnNotFoundResponse());
            }

            usuario.Contactado = !usuario.Contactado;
            
            var resultadoDelServicio = await _usuarioService.Update(usuario);

            var usuarioActualizado = _mapper.Map<UsuarioDto>(resultadoDelServicio);

            return Ok(_responseHelper.ReturnOkResponse(usuarioActualizado, "Contactado actualizada"));
        }

        [HttpPut("datosbancarios")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> ActualizarDatosBancarios(DatosBancariosDto datosBancariosDto)
        {
            var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUserClaims.Name;

            var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

            if (loggedUser == null)
            {
                return Unauthorized();
            }

            var datosBancarios = _mapper.Map<DatosBancarios>(datosBancariosDto);

            loggedUser.DatosBancarios = datosBancarios;

            var usuarioActualizado = await _usuarioService.Update(loggedUser);

            var usuario = new UsuarioLogin
            {
                Nombres = usuarioActualizado.Nombres,
                Apellidos = usuarioActualizado.Apellidos,
                Mail = usuarioActualizado.Email,
                userId = usuarioActualizado.Id.ToString(),
                Rut = usuarioActualizado.Rut,
                verificaCedula = usuarioActualizado.VerificacionCedula,
                Domicilio = usuarioActualizado.Direccion,
                FechaNacimiento = usuarioActualizado?.FechaNacimiento.ToString(CultureInfo.InvariantCulture),
                Pais = usuarioActualizado.Nacionalidad,
                Oficio = usuarioActualizado.Oficio,
                EstadoCivil = usuarioActualizado.EstadoCivil,
                Telefono = usuarioActualizado.Telefono,
                ClienteId = usuarioActualizado.ClienteId,
                ProperId = usuarioActualizado.ProperId.ToString(),
                TipoCuenta = usuarioActualizado.TipoCuenta,
                EsEmbajador = usuarioActualizado.EsEmbajador,
                DatosBancarios = usuarioActualizado.DatosBancarios
            };

            return Ok(Json(_responseHelper.ReturnOkResponse(usuario, "Datos bancarios actualizados")));
        }

        [HttpPut("QuieroSerEmbajador")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> CambiarAEmbajador()
        {
            var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUserClaims.Name;

            var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

            if (loggedUser == null)
            {
                return Unauthorized();
            }

            loggedUser.EsEmbajador = true;

            var resultadoDelServicio = await _usuarioService.Update(loggedUser);

            var usuarioActualizado = _mapper.Map<UsuarioDto>(resultadoDelServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(usuarioActualizado, "Embajador actualizada")));
        }


        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        [HttpPost("SendSms")]
        public IActionResult SendSms(SmsDto model)
        {
            var accountSid = "AC9e5f9b8190056fdea669ad5924352260";
            var authToken = "a1c1c90674672d0e5349215306d0b0a0";
            TwilioClient.Init(accountSid, authToken);

            var messageOptions = new CreateMessageOptions(
                new PhoneNumber(model.To))
            {
                From = new PhoneNumber("+56937100256"),
                MessagingServiceSid = "MG18b81d426cb83bf2bdec1248711608ee",
                Body = model.Message
            };

            var message = MessageResource.Create(messageOptions);
            return Ok(message.Sid);
        }


        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        [HttpPost("ValidaCedula")]
        public async Task<IActionResult> ValidaCedula(VerificaUsuarioDto verificaUsuario)
        {
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "38e99e19a4c64006b99fba6b7b448ddb");

            // Request parameters
            queryString["language"] = "es";
            queryString["detectOrientation"] = "true";
            var uri = _configuration.Value.Url + queryString;

            HttpResponseMessage response;
            string base64 = string.Empty;

            if (verificaUsuario.Foto.IndexOf(",") > -1)
            {
                base64 = verificaUsuario.Foto.Split(",")[1];
            }

            if (!string.IsNullOrWhiteSpace(base64))
            {
                var usuario = await _usuarioService.Get(ObjectId.Parse(verificaUsuario.Id));
                // Request body
                byte[] byteData = Convert.FromBase64String(base64);

                using (var content = new ByteArrayContent(byteData))
                {
                    content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                    response = await client.PostAsync(uri, content);
                    var contents = await response.Content.ReadAsAsync<ReconocimientoTextoDto>();

                    if (!AreThereTextInPicture(contents.regions))
                    {
                        return Ok(Json(_responseHelper.ReturnBadRequestResponse()));
                    }

                    var result = contents.regions.ToList().Select(region =>
                        string.Join(" ", region.Lines.ToList().Select(line =>
                            string.Join(" ", line.words.ToList().Select(word =>
                                word.text).ToArray())).ToArray())).ToArray();

                    int count = 0;

                    List<string> correctas = new List<string>();
                    foreach (var item in result)
                    {
                        Regex reg = new Regex("[^a-zA-Z0-9 ]");
                        if (!string.IsNullOrEmpty(usuario.Rut))
                        {
                            Regex rx = new Regex(usuario.Rut.Split("-")[0]);
                            foreach (Match match in rx.Matches(item.Replace(".", "")))
                            {
                                count++;
                                correctas.Add("RUN: " + Helper.FormatearRut(usuario.Rut).ToUpper());
                            }
                        }

                        string evaluar = item.Trim().Normalize(NormalizationForm.FormD);
                        string textoSinAcentos = reg.Replace(evaluar, "");

                        if (!string.IsNullOrEmpty(usuario.Nombres))
                        {
                            string evaluarNombre = usuario.Nombres.ToUpper().Normalize(NormalizationForm.FormD);
                            string nombreSinAcentos = reg.Replace(evaluarNombre, "").Trim();
                            Regex rxNombre = new Regex(nombreSinAcentos);
                            foreach (Match match in rxNombre.Matches(textoSinAcentos))
                            {
                                count++;
                                correctas.Add("Nombres: " + usuario.Nombres.ToUpper());
                            }
                        }

                        if (!string.IsNullOrEmpty(usuario.Apellidos))
                        {
                            string evaluarApellido = usuario.Apellidos.ToUpper().Normalize(NormalizationForm.FormD);
                            string apellidoSinAcentos = reg.Replace(evaluarApellido, "").Trim();
                            Regex rxApellido = new Regex(apellidoSinAcentos);
                            foreach (Match match in rxApellido.Matches(textoSinAcentos))
                            {
                                count++;
                                correctas.Add("Apellidos: " + usuario.Apellidos.ToUpper());
                            }
                        }
                    }

                    usuario.VerificacionCedula = true;
                    if (result != null && result.Length > 0)
                        usuario.TextoApiVision = string.Join("@", result);
                    await _usuarioService.Update(usuario);
                    return Ok(new ResponseDto {Data = correctas, Estado = Estados.Respuesta.Ok});
                }
            }

            return Ok(new ResponseDto
                {Estado = Estados.Respuesta.Error, Mensaje = "No se puedo efectuar ninguna validación"});
        }

        private bool AreThereTextInPicture(List<RegionPalabraDto> texts)
        {
            return !texts.IsNullOrEmpty();
        }
    }
}