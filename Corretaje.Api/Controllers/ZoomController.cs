using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Zoom;
using Corretaje.Common.Extension;
using Corretaje.Domain;
using Corretaje.Domain.Zoom;
using Corretaje.Repository;
using Corretaje.Service.IServices.IProyectoInmobiliario;
using Corretaje.Service.IServices.IZoom;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Route("api/zoom")]
    [ApiController]
    public class ZoomController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IResponseHelper _responseHelper;
        private readonly IRepository<ZoomMeeting> _zoomRepository;
        private readonly IZoomService _zoomService;
        private readonly IProyectoInmobiliarioService _proyectoInmobiliarioService;

        public ZoomController(
            IMapper mapper,
            IResponseHelper responseHelper,
            IRepository<ZoomMeeting> zoomRepository,
            IZoomService zoomService,
            IProyectoInmobiliarioService proyectoInmobiliarioService)
        {
            _mapper = mapper;
            _responseHelper = responseHelper;
            _zoomRepository = zoomRepository;
            _zoomService = zoomService;
            _proyectoInmobiliarioService = proyectoInmobiliarioService;
        }

        [HttpPost("meeting")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AddZoomMeeting(ZoomMeetingDto zoomMeeting)
        {
            var result = await _zoomRepository.Insert(_mapper.Map<ZoomMeeting>(zoomMeeting));

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, _responseHelper.ReturnOkResponse(result));
        }

        [HttpPost("meeting/{id}/event")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AddZoomMeetingEvents(string id, IEnumerable<ZoomMeetingEventDto> zoomMeetingEvents)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id)));
            }

            var zoomMeeting = await _zoomRepository.Get(new ObjectId(id));

            if (zoomMeeting == null)
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            var result = await _zoomService.AddMeetingEvents(zoomMeeting, _mapper.Map<IEnumerable<ZoomMeetingEvent>>(zoomMeetingEvents));

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, _responseHelper.ReturnOkResponse(result));
        }

        [HttpPut("meeting/{id}/event")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UpdateZoomMeetingEvent(string id, ZoomMeetingEventDto zoomMeetingEvent)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id)));
            }

            var zoomMeeting = await _zoomRepository.Get(new ObjectId(id));

            if (zoomMeeting == null)
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            var result = await _zoomService.UpdateMeetingEvent(zoomMeeting, _mapper.Map<ZoomMeetingEvent>(zoomMeetingEvent));

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, _responseHelper.ReturnOkResponse(result));
        }

        [HttpGet("meeting")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetAll()
        {
            var result = await _zoomRepository.GetAll();

            if (result.IsNullOrEmpty())
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            return Ok(_responseHelper.ReturnOkResponse(_mapper.Map<IEnumerable<ZoomMeetingDto>>(result)));
        }

        [HttpGet("meeting/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetById(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id)));
            }

            var result = await _zoomRepository.Get(new ObjectId(id));

            if (result == null)
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            var zoomMeeting = _mapper.Map<ZoomMeetingDto>(result);

            return Ok(_responseHelper.ReturnOkResponse(zoomMeeting));
        }

        [HttpGet("meeting/connectionsignature")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetMeetingConnectionSignature(string meetingNumber, string role, string proyectoInmobiliarioId)
        {
            if (string.IsNullOrWhiteSpace(meetingNumber))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse("número de reunión desconocido"));
            }

            if (string.IsNullOrWhiteSpace(proyectoInmobiliarioId))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse("Id de proyecto es requerído"));
            }

            var proyecto = await _proyectoInmobiliarioService.Get(new ObjectId(proyectoInmobiliarioId));

            if (proyecto == null)
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            string key = proyecto.ApiKey;
            string secret = proyecto.ApiSecret;
            DateTime connectionDateTime = DateTime.UtcNow.ToUniversalTime();

            return Ok(_responseHelper.ReturnOkResponse(_zoomService.GetMeetingConnectionSignature(key, meetingNumber, role, secret, connectionDateTime)));
        }

        //[HttpGet("api/token")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDto))]
        //[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        //[ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        //public IActionResult GetZoomApiToken()
        //{
        //    string key = "iDMHkcaySBi-l3QHSlxHgA";
        //    string secret = "ozd9tWrAVzT1llRO8t9hzKSKPvxrbYFGMymH";

        //    return Ok(_responseHelper.ReturnOkResponse(_zoomService.GetAPIToken(key, secret))); 
        //}
    }
}