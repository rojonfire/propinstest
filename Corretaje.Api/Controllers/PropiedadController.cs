using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Commons.Imagen;
using Corretaje.Api.Commons.Propiedad;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Busqueda;
using Corretaje.Api.Dto.Propiedad;
using Corretaje.Common.BlobService;
using Corretaje.Common.Extension;
using Corretaje.Domain;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IBusqueda;
using Corretaje.Service.IServices.IOferta;
using Corretaje.Service.IServices.IPropiedad;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver.GeoJsonObjectModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Corretaje.Service.IServices.ITarjetaProp;
using System.Security.Claims;
using static Corretaje.Domain.Estados;
using Corretaje.Service.IServices.IUsuario;
using Corretaje.Service.IServices.ISBIF;
using Corretaje.Service.IServices.ISuscripcion;
using Corretaje.Service.IServices.IPlan;
using Corretaje.Api.Render;
using Corretaje.Api.Dto.Agenda;
using Corretaje.Api.Commons.Agenda;
using Corretaje.Service.IServices.IVisita.IVisitaFotografo;

namespace Corretaje.Api.Controllers
{
    //[Authorize]
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class PropiedadController : Controller
    {
        private readonly IBlobService _blobService;
        private readonly IBusquedaService _busquedaService;
        private readonly IClienteService _clienteService;
        private readonly IPropiedadConfiguracion _propiedadConfiguration;
        private readonly ICounterService _counterService;
        private readonly IImagenHelper _imagenHelper;
        private readonly IMapper _mapper;
        private readonly IOfertaService _ofertaService;
        private readonly IPropiedadHelper _propiedadHelper;
        private readonly IPropiedadService _propiedadService;
        private readonly ITarjetaPropService _tarjetaPropService;
        private readonly IResponseHelper _responseHelper;
        private readonly IMapHelper _mapHelper;
        private readonly IUsuarioService _usuarioService;
        private readonly ISBIFService _SBIFService;
        private readonly ISuscripcionService _suscripcionService;
        private readonly IPlanService _planService;
        private readonly IViewRender _viewRender;
        private readonly IAgendaHelper _agendaHelper;
        private readonly IVisitaFotografoService _visitaFotografoService;

        public PropiedadController(IBlobService blobService,
            IBusquedaService busquedaService,
            IClienteService clienteService,
            IPropiedadConfiguracion propiedadConfiguration,
            ICounterService counterService,
            IImagenHelper imagenHelper,
            IMapper mapper,
            IOfertaService ofertaService,
            IPropiedadHelper propiedadHelper,
            IPropiedadService propiedadService,
            IResponseHelper responseHelper,
            ITarjetaPropService tarjetaPropService,
            IMapHelper mapHelper,
            IUsuarioService usuarioService,
            ISBIFService sBIFService,
            ISuscripcionService suscripcionService,
            IPlanService planService,
            IViewRender viewRender,
            IAgendaHelper agendaHelper,
            IVisitaFotografoService visitaFotografoService
            )
        {
            _blobService = blobService;
            _busquedaService = busquedaService;
            _clienteService = clienteService;
            _propiedadConfiguration = propiedadConfiguration;
            _counterService = counterService;
            _imagenHelper = imagenHelper;
            _mapper = mapper;
            _ofertaService = ofertaService;
            _propiedadHelper = propiedadHelper;
            _propiedadService = propiedadService;
            _responseHelper = responseHelper;
            _tarjetaPropService = tarjetaPropService;
            _mapHelper = mapHelper;
            _usuarioService = usuarioService;
            _SBIFService = sBIFService;
            _suscripcionService = suscripcionService;
            _planService = planService;
            _viewRender = viewRender;
            _agendaHelper = agendaHelper;
            _visitaFotografoService = visitaFotografoService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Propiedad>))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get()
        {
            var propiedades = await _propiedadService.GetAll();
            return Json(propiedades);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Propiedad))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Get(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id))));
            }
            var propiedad = await _propiedadService.Get(new ObjectId(id));

            if (propiedad == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            return Ok(Json(_responseHelper.ReturnOkResponse(propiedad, "Se han encontrado resultados para su busqueda")));
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Post(Propiedad propiedad)
        {
            bool subidoPorBroker = false;
            var loggedUser = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUser.Name;

            var user = await _usuarioService.Get(new ObjectId(userId));
            if (user != null && user.TipoCuenta == TipoCuenta.Broker)
            {
                propiedad.IdBroker = userId;
                subidoPorBroker = true;
            }

            if (!ModelState.IsValid) return BadRequest();
            var count = await _counterService.GetSequenceValue("item_id");
            propiedad.CodigoPropiedad = "PROP_" + count;
            propiedad.Location =
                new GeoJsonPoint<GeoJson2DGeographicCoordinates>(
                    new GeoJson2DGeographicCoordinates(propiedad.Loc.x, propiedad.Loc.y));

            propiedad.ImageContainerName = Guid.NewGuid().ToString();

            foreach (var imagen in propiedad.Imagenes)
            {
                var imagetoBytes = Convert.FromBase64String(imagen.Value.Split(',')[1]);

                imagen.DownloadLink = await _blobService.UploadToBlob(imagen.Name,
                    _propiedadConfiguration.AlmacenamientoConeccion,
                    propiedad.ImageContainerName, imagetoBytes, null);

                imagen.Value = "";
            }

            propiedad.Disponible = false;

            bool sendEmailCopia = false;

            if (propiedad.IdPlan != null)
            {
                var planContratado = await _planService.GetPlanById(new ObjectId(propiedad.IdPlan));
                propiedad.PlanContratado = planContratado;
                if (planContratado.Fast)
                {
                    sendEmailCopia = true;
                }
            }

            if (propiedad.IdFotografo != null)
            {
                if (propiedad.FechaVisitaFotografoString.Contains("T"))
                {
                    propiedad.FechaVisitaFotografo = DateTime.Now.AddDays(1);
                } else
                {
                    string[] partesFecha = propiedad.FechaVisitaFotografoString.Split("-");
                    int anio = int.Parse(partesFecha[0]);
                    int mes = int.Parse(partesFecha[1]);
                    int dia = int.Parse(partesFecha[2]);
                    propiedad.FechaVisitaFotografo = new DateTime(anio, mes, dia);
                }

            } else
            {
                propiedad.FechaVisitaFotografo = DateTime.Now.AddDays(1);
            }

            var propiedadAgregada = await _propiedadService.Add(propiedad);
            var cliente = await _clienteService.Get(new ObjectId(propiedad.IdCliente));

            if (subidoPorBroker)
            {
                if (cliente != null)
                {
                    var emailNotificacionSubidoPorBroker = _mapHelper.MapPropiedadSubidaPorBrokerAEmail(propiedadAgregada, cliente, user);
                    string emailNotificacionSubidoPorBrokerHtml = await _viewRender.RenderToStringAsync("~/Template/notificacion-propiedad-subida-broker.cshtml", emailNotificacionSubidoPorBroker);

                    var jefesDeVenta = await _usuarioService.GetUsuariosByTipoCuenta(TipoCuenta.JefeDeVentas);
                    if (jefesDeVenta != null && jefesDeVenta.Count() > 0)
                    {
                        var listaEmailsJefesDeVenta = jefesDeVenta.Where(i => i.Email != null && i.Email != "").Select(u => u.Email).ToList();
                        if (listaEmailsJefesDeVenta != null && listaEmailsJefesDeVenta.Count() > 0)
                        {
                            _propiedadService.SendEmailNotificacionNuevaPropiedadSubidaPorBroker(emailNotificacionSubidoPorBrokerHtml, listaEmailsJefesDeVenta);
                        }
                    }

                }
            }

            if (sendEmailCopia)
            {
                if (cliente != null)
                {
                    var propiedadEmail = _mapHelper.MapPropiedadFastAMail(propiedadAgregada, cliente);
                    string propiedadEmailHtml = await _viewRender.RenderToStringAsync("~/Template/plan-fast-copia.cshtml", propiedadEmail);
                    _propiedadService.SendEmailNotificacionNuevaPropiedadFast(propiedadEmailHtml, new List<string> { "mconsuegra@propins.cl" });
                }

            } else
            {
                if (propiedad.IdFotografo != null && cliente != null)
                {
                    var fotografo = await _usuarioService.Get(new ObjectId(propiedad.IdFotografo));

                    string IdPropiedad = propiedadAgregada.Id.ToString();

                    var userDuenoPropiedad = await _usuarioService.GetUsuarioByEmailAndRut(cliente.Mail, cliente.Rut);
                    if (userDuenoPropiedad != null)
                    {
                        var visitaFotografoAgregar = _mapHelper.MapToVisitaFotografo(propiedadAgregada, fotografo, userDuenoPropiedad.Id.ToString());

                        // se agregan datos del fotógrafo que no son enviados desde el request
                        // refactorizar los dto
                        _agendaHelper.MapFotografoVisitaFotografo(fotografo, visitaFotografoAgregar);

                        var respuestaServicio = await _visitaFotografoService.Add(visitaFotografoAgregar);

                        var visitaAgregada = _mapper.Map<VisitaFotografoDto>(respuestaServicio);

                        _agendaHelper.MapUsuarioVisitaFotografo(userDuenoPropiedad, visitaAgregada);

                        string mailCliente =
                        await _viewRender.RenderToStringAsync("~/Template/agenda-fotografo-notifica-cliente.cshtml",
                            visitaAgregada);

                        _visitaFotografoService.SendEmailVisitaAgendada(mailCliente, new List<string>() { userDuenoPropiedad.Email });

                        string mailFotografo =
                            await _viewRender.RenderToStringAsync("~/Template/agenda-fotografo-notifica-fotografo.cshtml",
                                visitaAgregada);

                        _visitaFotografoService.SendEmailVisitaAgendada(mailFotografo, new List<string>() { fotografo.Email });
                    }
                }
            }

            await _suscripcionService.UpdateRecomendaciones();

            return Ok(Json(_responseHelper.ReturnOkResponse(null, "Elemento Ingresado")));
        }

        [HttpPut]
        [Authorize]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UpdatePropiedad(PropiedadActualizarDto propiedad)
        {
            if (propiedad.ImageContainerName.IsNullOrEmpty())
            {
                propiedad.ImageContainerName = Guid.NewGuid().ToString();
            }

            foreach (var imagen in propiedad.Imagenes)
            {
                if (!_imagenHelper.ExisteImagen(imagen))
                {
                    continue;
                }

                var imagenBytes = _imagenHelper.GetRepresentacionEnBytes(imagen);

                imagen.DownloadLink = await _blobService.UploadToBlob(imagen.Name,
                    _propiedadConfiguration.AlmacenamientoConeccion, propiedad.ImageContainerName, imagenBytes, null);

                _imagenHelper.BorrarImagen(imagen);
            }

            //current data
            var bdPropiedad = await _propiedadService.Get(ObjectId.Parse(propiedad.Id));

            //new data
            var propiedadParaActualizar = _mapper.Map<Propiedad>(propiedad);

            if (propiedadParaActualizar.IdFotografo != null)
            {
                string[] partesFecha = propiedad.FechaVisitaFotografoString.Split("-");
                int anio = int.Parse(partesFecha[0]);
                int mes = int.Parse(partesFecha[1]);
                int dia = int.Parse(partesFecha[2]);
                propiedadParaActualizar.FechaVisitaFotografo = new DateTime(anio, mes, dia);
            } else
            {
                propiedadParaActualizar.FechaVisitaFotografo = bdPropiedad.FechaVisitaFotografo;
                propiedadParaActualizar.HoraVisitaFotografo = bdPropiedad.HoraVisitaFotografo;
                propiedadParaActualizar.IdFotografo = bdPropiedad.IdFotografo;
            }

            propiedadParaActualizar.CreatedAt = bdPropiedad.CreatedAt;

            if ((bdPropiedad.PlanContratado == null && propiedadParaActualizar.IdPlan != null) || (bdPropiedad.PlanContratado != null && bdPropiedad.PlanContratado.Id.ToString() != propiedadParaActualizar.IdPlan))
            {
                var planContratado = await _planService.GetPlanById(new ObjectId(propiedadParaActualizar.IdPlan));
                propiedadParaActualizar.PlanContratado = planContratado;
            } else
            {
                propiedadParaActualizar.PlanContratado = bdPropiedad.PlanContratado;
            }

            propiedadParaActualizar.DireccionReferencial = bdPropiedad.DireccionReferencial;

            propiedadParaActualizar.Id = new ObjectId(propiedad.Id);

            propiedadParaActualizar.CodigoPropiedad = bdPropiedad.CodigoPropiedad;

            _propiedadHelper.AsignarCoordenadasGeoEspaciales(propiedadParaActualizar);

            var propiedadActualizada = await _propiedadService.Update(propiedadParaActualizar);

            return Ok(Json(_responseHelper.ReturnOkResponse(propiedadActualizada, "Propiedad actualizada")));
        }

        [HttpGet("GetPropiedadCliente")]
        [ProducesResponseType(200, Type = typeof(List<object>))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetPropiedadesCliente()
        {
            var propiedades = await _propiedadService.GetPropiedadesCliente();
            return Json(propiedades);
        }

        [Authorize]
        [HttpGet("GetPropiedadesByClienteId")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(400, Type = typeof(BadRequestObjectResult))]
        [ProducesResponseType(404, Type = typeof(NotFoundObjectResult))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetPropiedadesByClienteId()
        {
            var loggedUser = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUser.Name;

            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _usuarioService.Get(new ObjectId(userId));
            if (user == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var propiedades = await _propiedadService.GetPropiedadesByClienteId(user.ClienteId);
            return Ok(Json(_responseHelper.ReturnOkResponse(propiedades)));
        }

        [AllowAnonymous]
        [HttpGet("BusquedaPropiedadHome")]
        [ProducesResponseType(200, Type = typeof(Propiedad))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> BusquedaPropiedadHome(string propiedadId, string clienteId)
        {
            if (string.IsNullOrWhiteSpace(propiedadId))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(propiedadId))));
            }

            var propiedad = await _propiedadService.Get(ObjectId.Parse(propiedadId));

            if (propiedad == null)
            {
                return Ok(Json(_responseHelper.ReturnOkResponse(propiedad, "Objeto correcto")));
            }

            var cliente = await _clienteService.Get(ObjectId.Parse(propiedad.IdCliente));

            var ofertas = await _ofertaService.GetOfertasByPublicacionId(propiedad.Id.ToString());

            _propiedadHelper.SetDatosCliente(cliente, propiedad);

            _propiedadHelper.SetDatosOferta(ofertas, propiedad, clienteId);

            return Ok(Json(_responseHelper.ReturnOkResponse(propiedad, "Objeto correcto")));
        }

        [AllowAnonymous]
        [HttpPost("BusquedaPropiedades")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> BusquedaPropiedades(BusquedaDto parametrosBusqueda)
        {
            const string resultadoMensaje = "Secuencia correcta";

            var busqueda = _mapper.Map<Busqueda>(parametrosBusqueda);

            var propiedades = await _tarjetaPropService.Buscar(busqueda);

            if (propiedades.IsNullOrEmpty())
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            if (!string.IsNullOrEmpty(parametrosBusqueda.Mail))
            {
                await _busquedaService.Add(busqueda);
            }

            return Ok(Json(_responseHelper.ReturnOkResponse(propiedades, propiedades.Count(), resultadoMensaje)));
        }

        [HttpPost("PropiedadesReferidas")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetPropiedadesReferidas(PropiedadDto props)
        {
            var tarjetas = await _tarjetaPropService.GetAll();
            var result = props.Ids.Select(prop => tarjetas.FirstOrDefault(x => x.IdProyecto == prop || x.IdUsados == prop)).ToList();

            return Ok(Json(_responseHelper.ReturnOkResponse(result, "Secuencia Correcta")));
        }


        [AllowAnonymous]
        [HttpGet("PropiedadesDestacadasHome")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> PropiedadesDestacadasHome(int limit)
        {
            var propiedadesDestacadas = (await _propiedadService.GetAll()).Where(x => x.Destacar).Take(limit);
            return Ok(Json(_responseHelper.ReturnOkResponse(propiedadesDestacadas, propiedadesDestacadas.Count(),
                "Secuencia correcta")));
        }

        [HttpPut("{id}/{estaDisponible}")]
        [Authorize]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> SetDisponible(string id, bool estaDisponible)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id))));
            }

            await _propiedadService.SetDisponible(new ObjectId(id), estaDisponible);

            return Ok(Json(_responseHelper.ReturnOkResponse(null)));
        }

        [HttpGet("BuscarPorEstado")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetPropiedadesByEstado(int estado)
        {
            EstadoPropiedad estadoPropiedad = (EstadoPropiedad)estado;
            var propiedadesFiltradas = await _propiedadService.GetPropiedadesByEstado(estadoPropiedad);
            return Ok(Json(_responseHelper.ReturnOkResponse(propiedadesFiltradas, "Secuencia correcta")));
        }

        [HttpPut("{id}/CambiarEstado")]
        [Authorize]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UpdateEstadoPropiedad(string id, UpdateEstadoPropiedadDto nuevoEstadoData)
        {
            var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUserClaims.Name;

            var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

            if (loggedUser == null)
            {
                return Unauthorized();
            }

            if (loggedUser.TipoCuenta != TipoCuenta.Administrador && loggedUser.TipoCuenta != TipoCuenta.JefeDeVentas)
            {
                return Forbid();
            }

            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id)));
            }
            if (string.IsNullOrWhiteSpace(nuevoEstadoData.Estado))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(nuevoEstadoData.Estado)));
            }
            var propiedad = await _propiedadService.Get(new ObjectId(id));

            if (propiedad == null)
            {
                return BadRequest(_responseHelper.ReturnNotFoundResponse());
            }

            EstadoPropiedad estadoPropiedad = (EstadoPropiedad)int.Parse(nuevoEstadoData.Estado);
            propiedad.EstadoPropiedad = estadoPropiedad;
            if (estadoPropiedad.Equals(Estados.EstadoPropiedad.PropiedadEntregada))
            {
                propiedad.FechaCambioEstadoAPropiedadEntregada = DateTime.Now;
                propiedad.IdSuscripcionDelComprador = nuevoEstadoData.IdSuscripcionDelComprador;
                propiedad.ValorCompraPropiedad = nuevoEstadoData.ValorCompraPropiedad;
            }

            var propiedadActualizada = await _propiedadService.Update(propiedad);

            var tarjetaProp = await _tarjetaPropService.GetByCodigoPropiedad(propiedad.CodigoPropiedad);

            if (tarjetaProp != null)
            {
                if (estadoPropiedad == EstadoPropiedad.PropiedadPublicada || estadoPropiedad == EstadoPropiedad.OfertaVigente)
                {
                    tarjetaProp.Disponible = true;
                }
                else
                {
                    tarjetaProp.Disponible = false;
                }

                var respuestaTarjeta = await _tarjetaPropService.Update(tarjetaProp);
            }

            return Ok(_responseHelper.ReturnOkResponse(propiedadActualizada, "Se ha cambiado de estado la propiedad exitosamente"));
        }

        [HttpGet("ListarPropiedades")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetAllPropiedades(string estado = "", string idBroker = "", int pageSize = 10, int page = 1)
        {
            var propiedadesPaginadas = await _propiedadService.GetAllPropiedades(pageSize, page, estado, idBroker);
            return Ok(Json(_responseHelper.ReturnOkResponse(propiedadesPaginadas, "Se han encontrado resultados para su busqueda")));
        }

        [HttpPost("GenerarTarjetaProp")]
        [Authorize]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> CreateTarjetaProp(string IdPropiedad)
        {
            var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUserClaims.Name;

            var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

            if (loggedUser == null)
            {
                return Unauthorized();
            }

            if (loggedUser.TipoCuenta != TipoCuenta.Administrador && loggedUser.TipoCuenta != TipoCuenta.JefeDeVentas)
            {
                return Forbid();
            }

            if (string.IsNullOrWhiteSpace(IdPropiedad))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(IdPropiedad)));
            }
            var propiedad = await _propiedadService.Get(new ObjectId(IdPropiedad));
            if (propiedad == null)
            {
                return BadRequest(_responseHelper.ReturnNotFoundResponse());
            }

            var valor = propiedad.Valor;
            if (propiedad.TipoPrecio == "CLP")
            {
                var valorUF = await _SBIFService.GetLastUf();
                valor = Math.Round(valor / double.Parse(valorUF.Valor));
            }

            var tarjetaProp = await _tarjetaPropService.GetByCodigoPropiedad(propiedad.CodigoPropiedad);

            TarjetaProp tarjetaPropAgregar = null;
            if (tarjetaProp == null)
            {
                tarjetaProp = _mapHelper.MapToTarjetaProp(propiedad, null);
                tarjetaProp.Valor = (int)valor;
                tarjetaPropAgregar = await _tarjetaPropService.Add(tarjetaProp);
            } else
            {
                string idTarjetaProp = tarjetaProp.Id.ToString();
                tarjetaProp = _mapHelper.MapToTarjetaProp(propiedad, idTarjetaProp);
                tarjetaProp.Valor = (int)valor;
                tarjetaPropAgregar = await _tarjetaPropService.Update(tarjetaProp);
            }

            return Ok(_responseHelper.ReturnOkResponse(tarjetaPropAgregar, "Se ha generado/actualizado la tarjeta propiedad con exito"));
        }

        [HttpPut("AsignarBroker")]
        [Authorize]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AsignarBroker(string IdPropiedad, string IdBroker)
        {
            var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUserClaims.Name;

            var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

            if (loggedUser == null)
            {
                return Unauthorized();
            }

            if (loggedUser.TipoCuenta != TipoCuenta.Administrador && loggedUser.TipoCuenta != TipoCuenta.JefeDeVentas)
            {
                return Forbid();
            }

            if (string.IsNullOrWhiteSpace(IdPropiedad))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(IdPropiedad)));
            }
            if (string.IsNullOrWhiteSpace(IdBroker))
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(IdPropiedad)));
            }

            var propiedad = await _propiedadService.Get(new ObjectId(IdPropiedad));
            if (propiedad == null)
            {
                return BadRequest(_responseHelper.ReturnNotFoundResponse());
            }

            var broker = await _usuarioService.Get(new ObjectId(IdBroker));
            if (broker == null)
            {
                return BadRequest(_responseHelper.ReturnNotFoundResponse());
            }

            if (broker.TipoCuenta != TipoCuenta.Broker)
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse("El usuario seleccionado no es un broker"));
            }

            propiedad.IdBroker = IdBroker;
            var propiedadActualizada = await _propiedadService.Actualizar(propiedad);
            return Ok(_responseHelper.ReturnOkResponse(propiedadActualizada, "Se ha asignado el broker con éxito"));
        }

        [HttpGet("broker{id}")]
        [Authorize]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetPropiedadesByBroker(string IdBroker)
        {
            if (string.IsNullOrWhiteSpace(IdBroker))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(IdBroker))));
            }

            var propiedades = await _propiedadService.GetPropiedadesByIdBroker(IdBroker);
            if (propiedades == null)
            {
                return BadRequest(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            return Ok(Json(_responseHelper.ReturnOkResponse(propiedades, "Se han encontrado resultados para su búsqueda")));
        }

        [HttpGet("ventas")]
        [Authorize]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetVentasPropiedades(int pageSize = 10, int page = 1)
        {
            var propiedadesPaginadas = await _propiedadService.GetAllPropiedades(pageSize, page, "5", "");
            if (propiedadesPaginadas == null || propiedadesPaginadas.Results.Count() <= 0)
            {
                return BadRequest(Json(_responseHelper.ReturnNotFoundResponse()));
            } else
            {
                foreach (var prop in propiedadesPaginadas.Results)
                {
                    //var usuarioBroker = await _usuarioService.Get(prop.)
                }
            }



            return Ok(Json(_responseHelper.ReturnOkResponse(propiedadesPaginadas, "Se han encontrado resultados para su búsqueda")));
        }

        [HttpGet("UpdateTarjetasProp")]
        [Authorize]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UpdateTarjetasProp()
        {
            var loggedUserClaims = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUserClaims.Name;

            var loggedUser = await _usuarioService.Get(ObjectId.Parse(userId));

            if (loggedUser == null)
            {
                return Unauthorized();
            }

            if (loggedUser.TipoCuenta != TipoCuenta.Administrador && loggedUser.TipoCuenta != TipoCuenta.JefeDeVentas)
            {
                return Forbid();
            }

            var tarjetasProp = await _tarjetaPropService.GetAll();

            if (tarjetasProp != null && tarjetasProp.Count() > 0)
            {
                foreach (var tp in tarjetasProp)
                {
                    if (tp.IdUsados != null)
                    {
                        var propiedad = await _propiedadService.Get(new ObjectId(tp.IdUsados));
                        if (propiedad != null && propiedad.PlanContratado != null && propiedad.PlanContratado.Id != null)
                        {
                            tp.IdPlan = propiedad.PlanContratado.Id.ToString();
                            var plan = await _planService.GetPlanById(propiedad.PlanContratado.Id);
                            if (plan != null)
                            {
                                tp.TipoOperacion = plan.EsVenta ? "venta" : "arriendo";
                            }                            
                        }
                    } else
                    {
                        tp.TipoOperacion = "proyecto";
                    }

                    await _tarjetaPropService.Update(tp);
                }

                return Ok(_responseHelper.ReturnOkResponse(null, "Se han actualizado las tarjetas propiedad con el plan correspondiente"));
            }      

            return NotFound(_responseHelper.ReturnNotFoundResponse());
        }
    }
}