using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Commons.SecurityHelper;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Usuario;
using Corretaje.Domain;
using Corretaje.Service.IServices.IBackoffice;
using Corretaje.Service.IServices.IUsuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BackofficeController : Controller
    {
        private readonly IBackofficeLoginValidador _backofficeLoginValidador;
        private readonly IEncriptacionHelper _encriptacionHelper;
        private readonly IMapper _mapper;
        private readonly IResponseHelper _responseHelper;
        private readonly ITokenHelper _tokenHelper;
        private readonly IUsuarioService _usuarioService;

        public BackofficeController(
            IBackofficeLoginValidador backofficeLoginValidador,
            IEncriptacionHelper encriptacionHelper,
            IMapper mapper,
            IResponseHelper responseHelper,
            ITokenHelper tokenHelper,
            IUsuarioService usuarioService)
        {
            _backofficeLoginValidador = backofficeLoginValidador;
            _encriptacionHelper = encriptacionHelper;
            _mapper = mapper;
            _responseHelper = responseHelper;
            _tokenHelper = tokenHelper;
            _usuarioService = usuarioService;
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Login(LoginCredencialesDto credenciales)
        {
            var usuario = await _usuarioService.GetByLogin(_encriptacionHelper.GenerarMd5Hash(credenciales.Password), credenciales.Email);

            if (usuario == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            if (!await _backofficeLoginValidador.Validar(usuario))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponse(string.Join(',', _backofficeLoginValidador.Errores))));
            }

            var usuarioLogin = _mapper.Map<BackofficeLoginDto>(usuario);

            usuarioLogin.Token = _tokenHelper.GenerarTokenUsuarioLogin(usuarioLogin.Id);

            return Ok(Json(_responseHelper.ReturnOkResponse(usuarioLogin, "Login Correcto")));
        }
    }
}