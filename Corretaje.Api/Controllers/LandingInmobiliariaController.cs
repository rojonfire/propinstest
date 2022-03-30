using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Commons.LandingInmobiliaria;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.LandingInmobiliaria;
using Corretaje.Domain;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.ILandingInmobiliaria;
using Corretaje.Service.IServices.IUsuario;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Corretaje.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LandingInmobiliariaController : Controller
    {
        private readonly ILandingInmobiliariaHelper _landingInmobiliariaHelper;
        private readonly ILandingInmobiliariaService _landingInmobiliariaService;
        private readonly IUsuarioService _usuarioService;
        private readonly IInmobiliariaService _inmobiliariaService;
        private readonly IResponseHelper _responseHelper;
        private readonly IMapper _mapper;

        public LandingInmobiliariaController(ILandingInmobiliariaHelper landingInmobiliariaHelper, ILandingInmobiliariaService landingInmobiliariaService, 
            IUsuarioService usuarioService, IInmobiliariaService inmobiliariaService, IResponseHelper responseHelper, IMapper mapper)
        {
            _landingInmobiliariaHelper = landingInmobiliariaHelper;
            _landingInmobiliariaService = landingInmobiliariaService;
            _usuarioService = usuarioService;
            _inmobiliariaService = inmobiliariaService;
            _responseHelper = responseHelper;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get(int pageSize = 10, int page = 1)
        {
            var landings = await _landingInmobiliariaService.GetAllPaginated(pageSize, page);

            return Ok(_responseHelper.ReturnOkResponse(landings, "Se han encontrado resultados para su busqueda"));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id)));
            }
            var landing = await _landingInmobiliariaService.Get(new ObjectId(id));

            if (landing == null)
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            return Ok(_responseHelper.ReturnOkResponse(landing, "Se han encontrado resultados para su busqueda"));
        }

        [HttpGet("GetByPathname")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetByPathname(string pathname)
        {
            if (string.IsNullOrWhiteSpace(pathname))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(pathname)));
            }
            var landing = await _landingInmobiliariaService.GetByPathname(pathname);

            if (landing == null)
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            return Ok(_responseHelper.ReturnOkResponse(landing, "Se han encontrado resultados para su busqueda"));
        }

        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Post(LandingInmobiliariaCrearEditarDto landingDto)
        {
            var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUserClaims.Name;

            var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

            if (loggedUser == null)
            {
                return Unauthorized();
            }

            if (loggedUser.TipoCuenta != Estados.TipoCuenta.Administrador &&
                loggedUser.TipoCuenta != Estados.TipoCuenta.JefeDeVentas &&
                loggedUser.TipoCuenta != Estados.TipoCuenta.Broker)
            {
                return Forbid();
            }

            if (landingDto.IdInmobiliaria != null)
            {
                var inmobiliaria = await _inmobiliariaService.GetById(new ObjectId(landingDto.IdInmobiliaria));
                if (inmobiliaria != null)
                {
                    _landingInmobiliariaHelper.SetPathname(landingDto, inmobiliaria.Nombre);

                    var landingInmobiliaria = _mapper.Map<LandingInmobiliaria>(landingDto);

                    landingInmobiliaria.Nombre = inmobiliaria.Nombre;                    

                    var resultado = await _landingInmobiliariaService.Add(landingInmobiliaria);

                    var landingInmobiliariaAdded = _mapper.Map<LandingInmobiliariaDto>(resultado);

                    return Ok(_responseHelper.ReturnOkResponse(landingInmobiliariaAdded, "Se ha agregado el landing inmobiliaria exitosamente"));

                } else
                {
                    return NotFound(_responseHelper.ReturnNotFoundResponse());
                }
                
            } else
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(landingDto.IdInmobiliaria)));
            }            
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Update(string id, LandingInmobiliariaCrearEditarDto landing)
        {
            var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUserClaims.Name;

            var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

            if (loggedUser == null)
            {
                return Unauthorized();
            }

            if (loggedUser.TipoCuenta != Estados.TipoCuenta.Administrador &&
                loggedUser.TipoCuenta != Estados.TipoCuenta.JefeDeVentas &&
                loggedUser.TipoCuenta != Estados.TipoCuenta.Broker)
            {
                return Forbid();
            }

            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id)));
            }            

            var landingOld = await _landingInmobiliariaService.Get(new ObjectId(id));

            if (landingOld == null)
            {
                return BadRequest(_responseHelper.ReturnNotFoundResponse());
            }

            if (landing.IdInmobiliaria != null)
            {
                var inmobiliaria = await _inmobiliariaService.GetById(new ObjectId(landing.IdInmobiliaria));
                if (inmobiliaria != null)
                {
                    _landingInmobiliariaHelper.SetPathname(landing, inmobiliaria.Nombre);

                    var landingToUpdate = _mapper.Map<LandingInmobiliaria>(landing);

                    landingToUpdate.Id = new ObjectId(id);
                    landingToUpdate.CreatedAt = landingOld.CreatedAt;
                    landingToUpdate.Version = landingOld.Version;

                    var resultado = await _landingInmobiliariaService.Update(landingToUpdate);

                    var suscripcionUpdated = _mapper.Map<LandingInmobiliariaDto>(resultado);

                    return Ok(_responseHelper.ReturnOkResponse(suscripcionUpdated, "Se ha actualizado el landing inmobiliaria exitosamente"));

                } else
                {
                    return NotFound(_responseHelper.ReturnNotFoundResponse());
                }
                    
            } else
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(landing.IdInmobiliaria)));
            }     
            
        }
    }
}