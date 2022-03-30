using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Broker;
using Corretaje.Domain;
using Corretaje.Service.IServices.IBroker;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Corretaje.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BrokerController : Controller
    {
        private readonly IBrokerService _brokerService;
        private readonly IResponseHelper _responseHelper;
        private readonly IMapper _mapper;

        public BrokerController(IBrokerService brokerService, IResponseHelper responseHelper, IMapper mapper)
        {
            _brokerService = brokerService;
            _responseHelper = responseHelper;
            _mapper = mapper;
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

            var broker = await _brokerService.Get(new ObjectId(id));

            if (broker == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            return Json(_responseHelper.ReturnOkResponse(broker));
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetAll()
        {
            var brokers = await _brokerService.GetAll();

            if (brokers == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            return Json(_responseHelper.ReturnOkResponse(brokers));
        }

        [HttpGet("GetBrokerByEmail")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetByEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(email))));
            }

            var broker = await _brokerService.GetByEmail(email);

            if (broker == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            return Json(_responseHelper.ReturnOkResponse(broker));
        }

        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Post(AgregarBrokerDto brokerDto)
        {
            var broker = _mapper.Map<Broker>(brokerDto);

            var brokerAgregado = await _brokerService.Add(broker);

            return Json(_responseHelper.ReturnOkResponse(brokerAgregado));
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Put(string id, Broker broker)
        {
            broker.Id = new ObjectId(id);

            var brokerDB = await _brokerService.Get(broker.Id);
            if (brokerDB == null)
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponse()));
            }

            var brokerActualizado = await _brokerService.Update(broker);

            return Json(_responseHelper.ReturnOkResponse(brokerActualizado));
        }

    }
}