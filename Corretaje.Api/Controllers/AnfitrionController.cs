using AutoMapper;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Evaluar;
using Corretaje.Domain;
using Corretaje.Domain.Evaluar;
using Corretaje.Service.IServices.IEvaluar;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnfitrionController : ControllerBase
    {
        private readonly IEvaluarAnfitrionService _evaluarAnfitrionService;
        private readonly IMapper _mapper;

        public AnfitrionController(IEvaluarAnfitrionService evaluarAnfitrionService, IMapper mapper)
        {
            _evaluarAnfitrionService = evaluarAnfitrionService;
            _mapper = mapper;
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Evaluar(EvaluarAnfitrionDto evaluacion)
        {
            await _evaluarAnfitrionService.Evaluar(_mapper.Map<EvaluarAnfitrion>(evaluacion));

            return NoContent();
        }
    }
}