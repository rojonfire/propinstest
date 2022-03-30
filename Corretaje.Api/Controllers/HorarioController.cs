using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Domain;
using Corretaje.Service.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Authorize]
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class HorarioController : Controller
    {
        private readonly IHorarioService _horarioService;
        private readonly IResponseHelper _responseHelper;

        public HorarioController(IHorarioService horarioService, IResponseHelper responseHelper)
        {
            _horarioService = horarioService;
            _responseHelper = responseHelper;
        }

        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Post(Horario horario)
        {
            if (!ModelState.IsValid) return BadRequest();
            var userHorarios = await _horarioService.GetAll();
            var horUser = userHorarios.FirstOrDefault(u => u.IdUsuario == horario.IdUsuario);
            if (horUser != null)
            {
                await _horarioService.Delete(horUser.Id);
            }
            await _horarioService.Insert(horario);
            return Ok(Json(_responseHelper.ReturnOkResponse(null, "Elemento Ingresado")));
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(Horario))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get()
        {
            if (!ModelState.IsValid) return BadRequest();
            var horarios = await _horarioService.GetAll();
            var enumerable = horarios.ToList();
            return enumerable.Any() ? Json(_responseHelper.ReturnOkResponse(enumerable, "Elemento Ingresado")) : Json(new { Estado = Estados.Respuesta.Error });
        }

        [HttpGet("GetHorariosByUser")]
        [ProducesResponseType(200, Type = typeof(List<Horario>))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetHorariosByUser(string userId)
        {
            if (!ModelState.IsValid) return BadRequest();
            var horarios = await _horarioService.GetHorarioPorUser(userId);
            return horarios.Any() ? Json(_responseHelper.ReturnOkResponse(horarios, "Elemento Ingresado")) : Json(new ResponseDto() { Estado = Estados.Respuesta.Error });
        }

    }
}