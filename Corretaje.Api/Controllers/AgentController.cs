using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Commons.SecurityHelper;
using Corretaje.Api.Dto;
using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices.IUsuario;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Route("api/agente")]
    [ApiController]
    public class AgentController : ControllerBase
    {
        private readonly IEncriptacionHelper _encryptionHelper;
        private readonly IRepository<Inmobiliaria> _inmobiliariaRepository;
        private readonly IMapper _mapper;
        private readonly IResponseHelper _responseHelper;
        private readonly IUsuarioService _userService;
        //comentario
        //commentario 2
        
        public AgentController(
            IEncriptacionHelper encryptionHelper,
            IRepository<Inmobiliaria> inmobiliariaRepository,
            IMapper mapper,
            IResponseHelper responseHelper,
            IUsuarioService userService)
        {
            _encryptionHelper = encryptionHelper;
            _inmobiliariaRepository = inmobiliariaRepository;
            _mapper = mapper;
            _responseHelper = responseHelper;
            _userService = userService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Post(AgentDto agent)
        {
            agent.Password = _encryptionHelper.GenerarMd5Hash(agent.Password);

            var agentToAdd = _mapper.Map<Usuario>(agent);

            var validation = await _userService.Validar(agentToAdd);

            if (validation.Estado == Estados.Respuesta.Error)
            {
                return Ok(_responseHelper.ReturnBadRequestResponse(validation.Mensaje));
            }

            var result = await _userService.AddAgent(agentToAdd);

            var inmobiliaria = await _inmobiliariaRepository.Get(new ObjectId(agent.InmobiliariaId));
            await _inmobiliariaRepository.Update(inmobiliaria);

            return Ok(_responseHelper.ReturnOkResponse(_mapper.Map<AgentDto>(result), "Agente creado"));
        }
    }
}