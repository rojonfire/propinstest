using System.Threading.Tasks;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Api.Render;
using Corretaje.Common.Extension;
using Corretaje.Common.Pdf;
using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices.IReporte;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Corretaje.Api.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReporteController : ControllerBase
    {
        private readonly IRepository<Reporte> _reporteRepository;
        private readonly IRepository<Inmobiliaria> _inmobiliarioRepository;
        private readonly IResponseHelper _responseHelper;
        private readonly IPdfCreador _pdfCreador;
        private readonly IReporteService _reporteSevice;
        private readonly IViewRender _viewRender;
        private readonly Microsoft.Extensions.Configuration.IConfiguration _configuration;


        public ReporteController(
            IRepository<Reporte> reporteRepository,
            IResponseHelper responseHelper,
            IPdfCreador pdfCreador,
            IReporteService reporteSevice,
            IViewRender viewRender,
            Microsoft.Extensions.Configuration.IConfiguration configuration,
            IRepository<Inmobiliaria> inmobiliarioRepository
            )
        {
            _reporteRepository = reporteRepository;
            _responseHelper = responseHelper;
            _pdfCreador = pdfCreador;
            _reporteSevice = reporteSevice;
            _viewRender = viewRender;
            _configuration = configuration;
            _inmobiliarioRepository = inmobiliarioRepository;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetAll()
        {
            var reportes = await _reporteRepository.GetAll();

            if (reportes.IsNullOrEmpty())
            {
                return Ok(_responseHelper.ReturnNotFoundResponse());
            }

            return Ok(_responseHelper.ReturnOkResponse(reportes));
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

            var reporte = await _reporteRepository.Get(new ObjectId(id));

            if (reporte == null)
            {
                return Ok(_responseHelper.ReturnNotFoundResponse());
            }

            return Ok(_responseHelper.ReturnOkResponse(reporte));
        }

        [HttpGet("QueryString")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetByQueryString(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id)));
            }

            var reporte = await _reporteRepository.Get(new ObjectId(id));

            if (reporte == null)
            {
                return Ok(_responseHelper.ReturnNotFoundResponse());
            }

            return Ok(_responseHelper.ReturnOkResponse(reporte));
        }

        [HttpGet("GeneraReporte")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GeneraReporte()
        {
            var ress = await _reporteSevice.GeneraReportes();  
            return Ok(_responseHelper.ReturnOkResponse(ress));
        }
    }
}
