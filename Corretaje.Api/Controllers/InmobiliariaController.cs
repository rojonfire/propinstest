using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Common.BlobService;
using Corretaje.Common.Extension;
using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InmobiliariaController : Controller
    {
        private readonly IBlobService _blobStorageService;
        private readonly IConfiguration _configuration;
        private readonly IRepository<Inmobiliaria> _inmobiliariaRepository;
        private readonly IInmobiliariaService _inmobiliariaService;
        private readonly IMapper _mapper;
        private readonly IResponseHelper _responseHelper;

        public InmobiliariaController(
            IBlobService blobStorageService,
            IConfiguration configuration,
            IRepository<Inmobiliaria> inmobiliariaRepository,
            IInmobiliariaService inmobiliariaService,
            IMapper mapper,
            IResponseHelper responseHelper)
        {
            _blobStorageService = blobStorageService;
            _configuration = configuration;
            _inmobiliariaRepository = inmobiliariaRepository;
            _inmobiliariaService = inmobiliariaService;
            _mapper = mapper;
            _responseHelper = responseHelper;
        }

        [HttpGet("{id}")]
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

            var inmobiliaria = await _inmobiliariaRepository.Get(new ObjectId(id));

            if (inmobiliaria == null)
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            return Ok(_responseHelper.ReturnOkResponse(_mapper.Map<InmobiliariaDto>(inmobiliaria)));
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetAll()
        {
            var inmobiliarias = await _inmobiliariaRepository.GetAll();

            if (inmobiliarias.IsNullOrEmpty())
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            return Ok(_responseHelper.ReturnOkResponse(_mapper.Map<IEnumerable<InmobiliariaDto>>(inmobiliarias)));
        }

        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Create(InmobiliariaDto inmobiliariaToAdd)
        {
            var inmobiliaria = _mapper.Map<Inmobiliaria>(inmobiliariaToAdd);
            
            if (!string.IsNullOrEmpty(inmobiliariaToAdd.Logo?.Name) && !string.IsNullOrEmpty(inmobiliariaToAdd.Logo?.Value))
            {
                inmobiliaria.GenerateImageContainerName();

                inmobiliaria.Logo.DownloadLink = await _blobStorageService.UploadToBlob(
                    inmobiliariaToAdd.Logo.Name,
                    _configuration["AzureBlobStorage:CnnString"],
                    inmobiliaria.ImageContainerName,
                    inmobiliariaToAdd.Logo.GetImageBase64(),
                    null);                
            }            

            var result = await _inmobiliariaRepository.Insert(inmobiliaria);

            result.SetHtmlbuttonLink(_inmobiliariaService.AddLink(result.Id.ToString()));

            var inmob = await _inmobiliariaRepository.Get(result.Id);

            if (inmob == null)
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            await _inmobiliariaService.Update(inmob, result);

            return Ok(Json(_responseHelper.ReturnOkResponse(null, "Elemento Ingresado")));
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Update(string id, InmobiliariaDto update)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id)));
            }

            var inmobiliaria = await _inmobiliariaRepository.Get(new ObjectId(id));

            update.HtmlbuttonLink = _inmobiliariaService.AddLink(inmobiliaria.Id.ToString());

            if (inmobiliaria == null)
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            if (!string.IsNullOrEmpty(update.Logo?.Name) && !string.IsNullOrEmpty(update.Logo?.Value))
            {
                update.Logo.DownloadLink = await _blobStorageService.UploadToBlob(
                    update.Logo.Name,
                    _configuration["AzureBlobStorage:CnnString"],
                    update.Logo.CreateImageContainerName(),
                    update.Logo.GetImageBase64(),
                    null);
                update.Logo.ClearImage();
                update.Logo.Value = "";
            }

            await _inmobiliariaService.Update(inmobiliaria, _mapper.Map<Inmobiliaria>(update));

            return Ok(_responseHelper.ReturnOkResponse((new ResponseDto { Mensaje = "Cambios guardado con éxito." })));
        }
    }
}