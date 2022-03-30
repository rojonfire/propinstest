using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto.Aval;
using Corretaje.Domain;
using Corretaje.Service.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AvalController : Controller
    {
        private readonly IAvalService _avalService;
        private readonly IMapper _mapper;
        private readonly IResponseHelper _responseHelper;

        public AvalController(IMapper mapper, IAvalService avalService, IResponseHelper responseHelper)
        {
            _mapper = mapper;
            _avalService = avalService;
            _responseHelper = responseHelper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(_responseHelper.ReturnOkResponse(_mapper.Map<IEnumerable<AvalDto>>(await _avalService.GetAll())));
        }

        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(_responseHelper.ReturnOkResponse(_mapper.Map<AvalDto>(await _avalService.Get(new ObjectId(id)))));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AvalDto value)
        {
            var aval = await _avalService.Add(_mapper.Map<Aval>(value));

            return CreatedAtAction(nameof(Get), new { id = aval.Id }, _responseHelper.ReturnOkResponse(aval));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] AvalDto value)
        {
            return Ok(_responseHelper.ReturnOkResponse(_mapper.Map<AvalDto>(await _avalService.Update(_mapper.Map<Aval>(value)))));
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _avalService.Delete(new ObjectId(id));
        }
    }
}
