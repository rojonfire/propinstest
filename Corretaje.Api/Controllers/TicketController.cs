using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Domain;
using Corretaje.Common.EMail;
using Corretaje.Service.IServices.ITicket;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IResponseHelper _responseHelper;
        private readonly ITicketService _ticketService;
        private readonly IEMailService _eMailService;

        public TicketController(IMapper mapper, IResponseHelper responseHelper, ITicketService ticketService, IEMailService eMailService)
        {
            _mapper = mapper;
            _responseHelper = responseHelper;
            _ticketService = ticketService;
            _eMailService = eMailService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetAllTicketsEnEstadoAbierto()
        {
            var ticketsEnEstadoAbierto = await _ticketService.GetAllTicketsEnEstadoAbierto();

            if (ticketsEnEstadoAbierto.Count == 0)
            {
                return Ok(Json(_responseHelper.ReturnErrorResponse(null, "Secuencia no contiene elementos")));
            }

            return Ok(Json(_responseHelper.ReturnOkResponse(_mapper.Map<IEnumerable<TicketDto>>(ticketsEnEstadoAbierto), "Secuencia correcta")));
        }

        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<ActionResult> AddTicket(TicketDto ticket)
        {
            if (ticket == null)
            {
                return BadRequest();
            }

            var ticketToAdd = _mapper.Map<Ticket>(ticket);
            var result = await _ticketService.AddTicket(ticketToAdd);
            var ticketCreado = _mapper.Map<TicketDto>(result);

            var mail = new EMail
            {
                Content = $"Nueva Solicitud de Contacto de {ticketToAdd?.EMail} Teléfono {ticketToAdd?.Telefono} Pregunta {ticketToAdd?.Pregunta}",
                FromAddress = "contacto@propins.cl",
                Subject = "Nueva Solicitud de Contacto",
                ToAddresses = new List<string>() { "contacto@propins.cl" }
            };

            _eMailService.Send(mail);

            return CreatedAtAction("Get", new { id = ticketCreado.Id }, ticketCreado);
        }

        [HttpPut]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public ActionResult ResponderTicket(TicketDto ticketRespondido)
        {
            if (ticketRespondido == null || string.IsNullOrWhiteSpace(ticketRespondido.Respuesta))
            {
                return Ok(Json(_responseHelper.ReturnErrorResponse(null, "Debe ingresar una respuesta")));
            }

            var ticket = _mapper.Map<Ticket>(ticketRespondido);

            _ticketService.ResponderTicket(ticket);

            _ticketService.CerrarTicket(ticket);

            return Ok(Json(_responseHelper.ReturnOkResponse(null, "Ticket Actualizado")));
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

            var ticket = await _ticketService.GetById(new MongoDB.Bson.ObjectId(id));

            return Ok(Json(_responseHelper.ReturnOkResponse(null, "Secuencia Correcta")));
        }
    }
}
