using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Evaluar;
using Corretaje.Common.BlobService;
using Corretaje.Common.Extension;
using Corretaje.Domain;
using Corretaje.Domain.Evaluar;
using Corretaje.Repository;
using Corretaje.Service.IServices.IEvaluar;
using Corretaje.Service.IServices.IProyectoInmobiliario;
using Corretaje.Service.IServices.IUsuario;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver.GeoJsonObjectModel;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using System.Linq;
using System;
using Microsoft.AspNetCore.Authorization;

namespace Corretaje.Api.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProyectoInmobiliarioController : ControllerBase
    {
        private readonly IBlobService _blobStorageService;
        private readonly IConfiguration _configuration;
        private readonly IEvaluarProyectoService _evaluarProyectoService;
        private readonly IMapper _mapper;
        private readonly IRepository<ProyectoInmobiliario> _proyectoInmobiliarioRepository;
        private readonly IProyectoInmobiliarioService _proyectoInmobiliarioService;
        private readonly IResponseHelper _responseHelper;
        private readonly IUsuarioService _usuarioService;
        private readonly IRepository<Inmobiliaria> _inmobiliariaRepository;

        public ProyectoInmobiliarioController(
            IBlobService blobStorageService,
            IConfiguration configuration,
            IEvaluarProyectoService evaluarProyectoService,
            IMapper mapper,
            IRepository<ProyectoInmobiliario> proyectoInmobiliarioRepository,
            IProyectoInmobiliarioService proyectoInmobiliarioService,
            IResponseHelper responseHelper,
            IUsuarioService usuarioService,
            IRepository<Inmobiliaria> inmobiliariaRepository)
        {
            _blobStorageService = blobStorageService;
            _configuration = configuration;
            _evaluarProyectoService = evaluarProyectoService;
            _mapper = mapper;
            _proyectoInmobiliarioRepository = proyectoInmobiliarioRepository;
            _proyectoInmobiliarioService = proyectoInmobiliarioService;
            _responseHelper = responseHelper;
            _usuarioService = usuarioService;
            _inmobiliariaRepository = inmobiliariaRepository;
        }

        [AllowAnonymous]
        [HttpPost("Evaluar")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Evaluar(EvaluarProyectoInmobiliarioDto evaluacion)
        {
            await _evaluarProyectoService.Evaluar(_mapper.Map<EvaluarProyectoInmobiliario>(evaluacion));

            return NoContent();
        }
        
      
        [HttpGet("Evaluar/GetEvaluacion/{proyectoInmobiliarioId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetEvaluacion(string proyectoInmobiliarioId)
        {
            var evaluaciones = await _evaluarProyectoService.GetAllByProyectoId(new ObjectId(proyectoInmobiliarioId));
            if (evaluaciones.Count() == 0) return NotFound(_responseHelper.ReturnNotFoundResponse());

            var sumEq = 0;
            var sumTe = 0;
            var sumCo = 0;
            var sumRe = 0;
            var count = 0;

            foreach(var evaliacion in evaluaciones)
            {
                sumEq += evaliacion.EvaluacionEquipamiento;
                sumTe += evaliacion.EvaluacionTerminaciones;
                sumCo += evaliacion.EvaluacionConectividad;
                sumRe += evaliacion.EvaluacionRentabilidad;
                count ++;
            }

            var eval = new ProyectoEvaluacionDto()
            {
                EvaluacionEquipamiento = sumEq / count,
                EvaluacionTerminaciones = sumTe / count,
                EvaluacionConectividad = sumCo / count,
                EvaluacionRentabilidad = sumRe / count
            };

            return Ok(_responseHelper.ReturnOkResponse(eval));
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

            var proyectoInmobiliario = await _proyectoInmobiliarioRepository.Get(new ObjectId(id));

            if (proyectoInmobiliario == null)
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            return Ok(_responseHelper.ReturnOkResponse(_mapper.Map<ProyectoInmobiliarioDto>(proyectoInmobiliario)));
        }

      
        [HttpGet("GetAllProyectosByInmobiliariaId")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetAllProyectosByInmobiliariaId(string inmobiliariaId)
        {
            if (string.IsNullOrWhiteSpace(inmobiliariaId))
                return Ok(_responseHelper.ReturnBadRequestResponseByMissingId("InmobiliariaId no puede ser nulo"));
            var filter =
                Builders<ProyectoInmobiliario>.Filter.Where(proyecto => proyecto.InmobiliariaId == inmobiliariaId);
            var proyectosInmobiliarios = 
                await _proyectoInmobiliarioRepository.SearchFor(filter);

            if (proyectosInmobiliarios.IsNullOrEmpty())
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            var proyectosDTO = _mapper.Map<IEnumerable<ProyectoInmobiliarioDto>>(proyectosInmobiliarios);

            foreach (var proyecto in proyectosDTO)
            {
                var evaluaciones = await _evaluarProyectoService.GetAllByProyectoId(new ObjectId(proyecto.Id));

                var sumEq = 0;
                var sumTe = 0;
                var sumCo = 0;
                var sumRe = 0;
                var count = 0;

                if (evaluaciones.Count() == 0)
                {
                    proyecto.EvaluacionEquipamiento = 0;
                    proyecto.EvaluacionTerminaciones = 0;
                    proyecto.EvaluacionConectividad = 0;
                    proyecto.EvaluacionRentabilidad = 0;
                    continue;
                }


                foreach (var evaliacion in evaluaciones)
                {
                    sumEq += evaliacion.EvaluacionEquipamiento;
                    sumTe += evaliacion.EvaluacionTerminaciones;
                    sumCo += evaliacion.EvaluacionConectividad;
                    sumRe += evaliacion.EvaluacionRentabilidad;
                    count++;
                }

                proyecto.EvaluacionEquipamiento = sumEq / count;
                proyecto.EvaluacionTerminaciones = sumTe / count;
                proyecto.EvaluacionConectividad = sumCo / count;
                proyecto.EvaluacionRentabilidad = sumRe / count;
            }            

            return Ok(_responseHelper.ReturnOkResponse(proyectosDTO));
        }

       
        [HttpGet("GetAllProyectosByUsuarioId")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetAllProyectosByUsuarioId(string usuarioId)
        {
            if (string.IsNullOrWhiteSpace(usuarioId))
                return Ok(_responseHelper.ReturnBadRequestResponseByMissingId("UsuarioId no puede ser nulo"));

            var user = await _usuarioService.Get(new ObjectId(usuarioId));

            if (string.IsNullOrWhiteSpace(user.InmobiliariaId))
                return Ok(_responseHelper.ReturnBadRequestResponseByMissingId("InmobiliariaId no puede ser nulo"));

            var filter =
                Builders<ProyectoInmobiliario>.Filter.Where(proyecto => proyecto.InmobiliariaId == user.InmobiliariaId);
            var proyectosInmobiliarios =
                await _proyectoInmobiliarioRepository.SearchFor(filter);

            if (proyectosInmobiliarios.IsNullOrEmpty())
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            return Ok(_responseHelper.ReturnOkResponse(
                _mapper.Map<IEnumerable<ProyectoInmobiliarioDto>>(proyectosInmobiliarios)));
        }

     
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetAll()
        {
            var proyectosInmobiliarios = await _proyectoInmobiliarioRepository.GetAll();

            if (proyectosInmobiliarios.IsNullOrEmpty())
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            return Ok(_responseHelper.ReturnOkResponse(
                _mapper.Map<IEnumerable<ProyectoInmobiliarioDto>>(proyectosInmobiliarios)));
        }

       [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Create(string id, ProyectoInmobiliarioDto proyectoInmobiliario)
        {
            if (proyectoInmobiliario.Imagenes != null)
            {
                foreach (var imagen in proyectoInmobiliario.Imagenes)
                {
                    if (!string.IsNullOrEmpty(imagen.Name) && !string.IsNullOrEmpty(imagen.Value))
                    {
                        imagen.DownloadLink = await _blobStorageService.UploadToBlob(
                        imagen.Name,
                        _configuration["AzureBlobStorage:CnnString"],
                        imagen.CreateImageContainerName(),
                        imagen.GetImageBase64(), null);

                        imagen.ClearImage();
                    }
                }
            }

            if (proyectoInmobiliario.Modelos != null)
            {
                foreach (var modelo in proyectoInmobiliario.Modelos)
                {
                    if (modelo.Imagenes != null)
                    {
                        foreach (var imagen in modelo.Imagenes)
                        {
                            if(!string.IsNullOrEmpty(imagen.Name) && !string.IsNullOrEmpty(imagen.Value))
                            {
                                imagen.DownloadLink = await _blobStorageService.UploadToBlob(
                                imagen.Name,
                                _configuration["AzureBlobStorage:CnnString"],
                                imagen.CreateImageContainerName(),
                                imagen.GetImageBase64(), null);

                                imagen.ClearImage();
                            }                            
                        }
                    }
                }
            }

            if (proyectoInmobiliario.Location != null)
            {
                proyectoInmobiliario.Location =
                    new GeoJsonPoint<GeoJson2DGeographicCoordinates>(
                        new GeoJson2DGeographicCoordinates(Convert.ToDouble(proyectoInmobiliario.Loc.x), Convert.ToDouble(proyectoInmobiliario.Loc.y)));
            }

            var result = await _proyectoInmobiliarioService.Create(new ObjectId(id),
                _mapper.Map<ProyectoInmobiliario>(proyectoInmobiliario));

            result.SetHtmlbuttonLink(_proyectoInmobiliarioService.AddLink(result.Id.ToString(), id));

            var res = await _proyectoInmobiliarioService.Update(new ObjectId(id), result);

            return CreatedAtAction(nameof(GetById), new {id = result.Id}, _mapper.Map<ProyectoInmobiliarioDto>(res));
        }

        [HttpPut("inmobiliaria/{id}")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Update(string id, ProyectoInmobiliarioDto proyectoInmobiliario)
        {
            if (proyectoInmobiliario.Imagenes != null)
            {
                foreach (var imagen in proyectoInmobiliario.Imagenes)
                {
                    if (!string.IsNullOrEmpty(imagen.Name) && !string.IsNullOrEmpty(imagen.Value))
                    {
                        imagen.DownloadLink = await _blobStorageService.UploadToBlob(
                        imagen.Name,
                        _configuration["AzureBlobStorage:CnnString"],
                        imagen.CreateImageContainerName(),
                        imagen.GetImageBase64(), null);

                        imagen.ClearImage();
                    }
                }
            }

            if (proyectoInmobiliario.Modelos != null)
            {
                foreach (var modelo in proyectoInmobiliario.Modelos)
                {
                    if (modelo.Imagenes != null)
                    {
                        foreach (var imagen in modelo.Imagenes)
                        {
                            if (!string.IsNullOrEmpty(imagen.Name) && !string.IsNullOrEmpty(imagen.Value))
                            {
                                imagen.DownloadLink = await _blobStorageService.UploadToBlob(
                                imagen.Name,
                                _configuration["AzureBlobStorage:CnnString"],
                                imagen.CreateImageContainerName(),
                                imagen.GetImageBase64(), null);

                                imagen.ClearImage();
                            }
                        }
                    }
                }
            }

            if (proyectoInmobiliario.Location != null)
            {
                proyectoInmobiliario.Location =
                    new GeoJsonPoint<GeoJson2DGeographicCoordinates>(
                        new GeoJson2DGeographicCoordinates(Convert.ToDouble(proyectoInmobiliario.Loc.x), Convert.ToDouble(proyectoInmobiliario.Loc.y)));
            }

            var proyectoUpdate = _mapper.Map<ProyectoInmobiliario>(proyectoInmobiliario);

            proyectoUpdate.SetHtmlbuttonLink(_proyectoInmobiliarioService.AddLink(proyectoInmobiliario.Id, id));
            
            await _proyectoInmobiliarioService.Update(new ObjectId(id), proyectoUpdate);

            return Ok(_responseHelper.ReturnOkResponse((new ResponseDto {Mensaje = "Elemento Actualizado"})));
        }

    
        [HttpPost("BusquedaProyectos")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetByQuery([FromBody] ProyectoInmobiliarioQueryStringDto query)
        {
            var busqueda = _mapper.Map<ProyectoInmobiliarioQueryString>(query);
            var proyectoInmobiliarios = await _proyectoInmobiliarioService.GetProyectosInmobiliariosByQuery(busqueda);

            if (proyectoInmobiliarios == null)
            {
                return NotFound(_responseHelper.ReturnNotFoundResponse());
            }

            var proyectosDTO = _mapper.Map<IEnumerable<ProyectoInmobiliarioDto>>(proyectoInmobiliarios);

            foreach (var proyecto in proyectosDTO)
            {
                var evaluaciones = await _evaluarProyectoService.GetAllByProyectoId(new ObjectId(proyecto.Id));

                var sumEq = 0;
                var sumTe = 0;
                var sumCo = 0;
                var sumRe = 0;
                var count = 0;

                if (evaluaciones.Count() == 0)
                {
                    proyecto.EvaluacionEquipamiento = 0;
                    proyecto.EvaluacionTerminaciones = 0;
                    proyecto.EvaluacionConectividad = 0;
                    proyecto.EvaluacionRentabilidad = 0;
                    continue;
                }                

                foreach (var evaliacion in evaluaciones)
                {
                    sumEq += evaliacion.EvaluacionEquipamiento;
                    sumTe += evaliacion.EvaluacionTerminaciones;
                    sumCo += evaliacion.EvaluacionConectividad;
                    sumRe += evaliacion.EvaluacionRentabilidad;
                    count++;
                }

                proyecto.EvaluacionEquipamiento = sumEq / count;
                proyecto.EvaluacionTerminaciones = sumTe / count;
                proyecto.EvaluacionConectividad = sumCo / count;
                proyecto.EvaluacionRentabilidad = sumRe / count;
            }

            return Ok(_responseHelper.ReturnOkResponse(proyectosDTO));
        }

       
        [HttpGet("usuario/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ResponseDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetProyectoByUsuarioId(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id)));
            }

            var usr = await _usuarioService.Get(ObjectId.Parse(id));
            
            if (usr == null)
            {
                return BadRequest("No existe un agente asociado al id ingresado.");
            }

            var proyectosAsignados = new List<ProyectoAsignadoDto>();

            var nombreInmobiliaria = "";

            if (usr.ProyectosInmobiliariosId == null)
            {
                return Ok(_responseHelper.ReturnErrorResponse(null,
                    "El agente no tiene proyectos inmobiliarios asignados, comuniquese con el administrador"));
            }

            foreach (var idProyecto in usr.ProyectosInmobiliariosId)
            {
                var proyectoInmobiliario =
                    _mapper.Map<ProyectoInmobiliarioDto>(await _proyectoInmobiliarioRepository.Get(new ObjectId(idProyecto)));
                if (proyectoInmobiliario == null)
                {
                    return NotFound(_responseHelper.ReturnNotFoundResponse());
                }

                nombreInmobiliaria = proyectoInmobiliario.NombreInmobiliaria;
                proyectosAsignados.Add(new ProyectoAsignadoDto
                {
                    Id = proyectoInmobiliario.Id,
                    Nombre = proyectoInmobiliario.Nombre
                });
            }

            var proyectosUsuario = new ProyectosUsuarioDto
            {
                InmobiliariaId = usr.InmobiliariaId,
                NombreInmobiliaria = nombreInmobiliaria,
                Proyectos = proyectosAsignados
            };

            return Ok(_responseHelper.ReturnOkResponse(proyectosUsuario));
        }
        
        
        
    }
}