using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Commons.Agenda;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Agenda;
using Corretaje.Api.Render;
using Corretaje.Common.Extension;
using Corretaje.Domain;
using Corretaje.Domain.Agenda;
using Corretaje.Repository;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IAgenda;
using Corretaje.Service.IServices.IBloqueService.IBloqueAgente;
using Corretaje.Service.IServices.IBloqueService.IBloqueCliente;
using Corretaje.Service.IServices.IBloqueService.IBloqueFotografo;
using Corretaje.Service.IServices.IPropiedad;
using Corretaje.Service.IServices.IProyectoInmobiliario;
using Corretaje.Service.IServices.ISuscripcion;
using Corretaje.Service.IServices.IUsuario;
using Corretaje.Service.IServices.IVisita.IVisitaAgente;
using Corretaje.Service.IServices.IVisita.IVisitaBrokerSuscriptor;
using Corretaje.Service.IServices.IVisita.IVisitaFotografo;
using Corretaje.Service.IServices.IVisita.IVisitaUsuario;
using Corretaje.Service.IServices.IVisita.IVisitaVirtual;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [ApiController]
    //[Authorize]
    [Route("api/[controller]")]
    public class AgendaController : Controller
    {
        private readonly IAgendaAgenteService _agendaAgenteService;
        private readonly IAgendaClienteService _agendaClienteService;
        private readonly IAgendaFotografoService _agendaFotografoService;
        private readonly IAgendaHelper _agendaHelper;
        private readonly IBloqueAgenteService _bloqueAgenteService;
        private readonly IBloqueClienteService _bloqueClienteService;
        private readonly IBloqueFotografoService _bloqueFotografoService;
        private readonly IClienteService _clienteService;
        private readonly IMapper _mapper;
        private readonly IPropiedadService _propiedadService;
        private readonly IProyectoInmobiliarioService _proyectoInmobiliarioService;
        private readonly IResponseHelper _responseHelper;
        private readonly IUsuarioService _usuarioService;
        private readonly IViewRender _viewRender;
        private readonly IVisitaAgenteService _visitaAgenteService;
        private readonly IVisitaUsuarioService _visitaUsuarioService;
        private readonly IVisitaFotografoService _visitaFotografoService;
        private readonly IVisitaVirtualService _visitaVirtualService;
        private readonly IVisitaBrokerSuscriptorService _visitaBrokerSuscriptorService;
        private readonly IConfiguration _configuration;
        private readonly IRepository<Inmobiliaria> _inmobiliariaRepository;
        private readonly ISuscripcionService _suscripcionService;

        public AgendaController(
            IAgendaAgenteService agendaAgenteService,
            IAgendaClienteService agendaClienteService,
            IAgendaFotografoService agendaFotografoService,
            IAgendaHelper agendaHelper,
            IBloqueAgenteService bloqueAgenteService,
            IBloqueClienteService bloqueClienteService,
            IBloqueFotografoService bloqueFotografoService,
            IClienteService clienteService,
            IMapper mapper,
            IPropiedadService propiedadService,
            IProyectoInmobiliarioService proyectoInmobiliarioService,
            IResponseHelper responseHelper,
            IUsuarioService usuarioService,
            IViewRender viewRender,
            IVisitaAgenteService visitaAgenteService,
            IVisitaFotografoService visitaFotografoService,
            IVisitaUsuarioService visitaUsuarioService, 
            IVisitaVirtualService visitaVirtualService,
            IVisitaBrokerSuscriptorService visitaBrokerSuscriptorService,
            IConfiguration configuration,
            IRepository<Inmobiliaria> inmobiliariaRepository,
            ISuscripcionService suscripcionService)
        {
            _agendaAgenteService = agendaAgenteService;
            _agendaClienteService = agendaClienteService;
            _agendaFotografoService = agendaFotografoService;
            _agendaHelper = agendaHelper;
            _bloqueAgenteService = bloqueAgenteService;
            _bloqueClienteService = bloqueClienteService;
            _bloqueFotografoService = bloqueFotografoService;
            _clienteService = clienteService;
            _mapper = mapper;
            _propiedadService = propiedadService;
            _proyectoInmobiliarioService = proyectoInmobiliarioService;
            _responseHelper = responseHelper;
            _usuarioService = usuarioService;
            _viewRender = viewRender;
            _visitaAgenteService = visitaAgenteService;
            _visitaFotografoService = visitaFotografoService;
            _visitaUsuarioService = visitaUsuarioService;
            _visitaVirtualService = visitaVirtualService;
            _visitaBrokerSuscriptorService = visitaBrokerSuscriptorService;
            _configuration = configuration;
            _inmobiliariaRepository = inmobiliariaRepository;
            _suscripcionService = suscripcionService;
        }

        #region AgregarBloques

        [HttpPost("AddBloquesAgente")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AddBloquesAgente(IEnumerable<BloqueAgenteAgregarDto> bloquesAgente)
        {
            var bloquesAgenteParaAgregar = _mapper.Map<IEnumerable<BloqueAgente>>(bloquesAgente);

            var respuestaServicio = await _bloqueAgenteService.Add(bloquesAgenteParaAgregar);

            var bloquesAgenteAgregados = _mapper.Map<IEnumerable<BloqueDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(bloquesAgenteAgregados)));
        }

        [HttpPost("AddBloquesCliente")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AddBloquesCliente(IEnumerable<BloqueClienteAgregarDto> bloque)
        {
            var bloqueParaAgregar = _mapper.Map<IEnumerable<BloqueCliente>>(bloque);

            var respuestaServicio = await _bloqueClienteService.Add(bloqueParaAgregar);

            var bloqueAgregado = _mapper.Map<IEnumerable<BloqueClienteDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(bloqueAgregado)));
        }

        [HttpPost("AddBloquesFotografo")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AddBloquesFotografo(IEnumerable<BloqueFotografoAgregarDto> bloquesFotografo)
        {
            var bloquesFotografoParaAgregar = _mapper.Map<IEnumerable<BloqueFotografo>>(bloquesFotografo);

            var respuestaServicio = await _bloqueFotografoService.Add(bloquesFotografoParaAgregar);

            var bloquesFotografoAgregados = _mapper.Map<IEnumerable<BloqueFotografoDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(bloquesFotografoAgregados)));
        }

        [HttpPost("AddBloquesUsuario")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AddBloquesUsuario(IEnumerable<BloqueUsuarioAgregarDto> bloques)
        {
            // No soporta usuarios diferentes, esto se ha hecho así para no ir a la bd a buscar el clienteId por cada registro de bloques.
            var primerBloque = bloques.FirstOrDefault();

            string usuarioId = _agendaHelper.GetUsuarioId(primerBloque);

            string clienteId = await _usuarioService.GetClienteId(new ObjectId(usuarioId));

            if (string.IsNullOrWhiteSpace(clienteId))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponse("Cliente no encontrado")));
            }

            var bloquesCliente = _agendaHelper.GenerarBloquesCliente(bloques, clienteId);

            return await AddBloquesCliente(bloquesCliente);
        }

        #endregion AgregarBloques

        #region AgendarVisita

        [HttpPost("AgendarVisita")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgendarVisita(VisitaUsuarioAgregarDto visita)
        {
            var visitaParaAgregar = _mapper.Map<VisitaUsuario>(visita);

            bool validacion = await _visitaUsuarioService.ValidarVisita(visitaParaAgregar.Fecha, visitaParaAgregar.PropiedadId, visitaParaAgregar.Tramo);

            if (!validacion)
            {
                return BadRequest(_responseHelper.ReturnBadRequestResponse("Ya existe una visita agendada en el tramo y fecha ingresados"));
            }

            var propiedad = await _propiedadService.Get(new ObjectId(visita.PropiedadId));

            if (propiedad != null)
            {
                visitaParaAgregar.IdBroker = propiedad.IdBroker;

                var broker = await _usuarioService.Get(new ObjectId(propiedad.IdBroker));

                if (broker != null)
                {
                    visitaParaAgregar.EmailBroker = broker.Email;
                } else
                {
                    return BadRequest(_responseHelper.ReturnBadRequestResponse("Esta propiedad aún no tiene un broker asignado. Si estás interesado en agendar una visita, contáctanos por Whatsapp"));
                }
            }

            var cliente = await _clienteService.Get(new ObjectId(visita.ClienteId));

            if (cliente != null)
            {
                visitaParaAgregar.NombrePropietario = $"{cliente.Nombres} {cliente.Apellidos}";

                visitaParaAgregar.EmailPropietario = cliente.Mail;
            }

            if (visita.UsuarioId != null)
            {
                var usuario = await _usuarioService.Get(new ObjectId(visita.UsuarioId));
                if (usuario != null)
                {
                    visitaParaAgregar.Rut = usuario.Rut;

                    visitaParaAgregar.Nombre = usuario.Nombres;

                    visitaParaAgregar.EmailComprador = usuario.Email;
                }
            }

            if (visita.IdSuscripcion != null)
            {
                var suscripcion = await _suscripcionService.Get(new ObjectId(visita.IdSuscripcion));
                if (suscripcion != null)
                {
                    visitaParaAgregar.Nombre = suscripcion.NombreUsuario;

                    visitaParaAgregar.EmailComprador = suscripcion.EmailUsuario;
                }
            }            

            visitaParaAgregar.PropiedadDireccion = _agendaHelper.GetDireccionPropiedad(propiedad);

            var respuestaServicio = await _visitaUsuarioService.Add(visitaParaAgregar);

            var visitaAgregada = _mapper.Map<VisitaUsuarioDto>(respuestaServicio);

            if (visita.UsuarioId != null)
            {
                var broker = await _usuarioService.Get(new ObjectId(propiedad.IdBroker));

                var usuario = await _usuarioService.Get(new ObjectId(visita.UsuarioId));

                var visitaUsuarioEmail = _agendaHelper.MapToEmailDto(visitaAgregada, usuario, propiedad, cliente);

                string mailHtml = await _viewRender.RenderToStringAsync("~/Template/agenda-visita.cshtml", visitaUsuarioEmail);

                string mailHtmlCopiaJefeVentas = await _viewRender.RenderToStringAsync("~/Template/agenda-visita-copia-jefeventas.cshtml", visitaUsuarioEmail);

                List<string> destinatarios = new List<string>();

                if (broker != null && broker.Email != null && broker.Email != "")
                {
                    destinatarios.Add(broker.Email);
                }
                if (cliente != null && cliente.Mail != null && cliente.Mail != "")
                {
                    destinatarios.Add(cliente.Mail);
                }
                if (usuario != null && usuario.Email != null && usuario.Email != "")
                {
                    destinatarios.Add(usuario.Email);
                }

                if (destinatarios.Count() > 0)
                {
                    _visitaUsuarioService.SendEmailVisitaAgendada(mailHtml, destinatarios);

                }

                _visitaUsuarioService.SendEmailVisitaAgendadaCopiaJefeVentas(mailHtmlCopiaJefeVentas);
            }

            if (visita.IdSuscripcion != null)
            {
                var broker = await _usuarioService.Get(new ObjectId(visita.IdBroker));

                var suscripcion = await _suscripcionService.Get(new ObjectId(visita.IdSuscripcion));

                var visitaAgregadaSuscripcion = _mapper.Map<VisitaBrokerSuscriptor>(visita);

                var visitaEmail = _agendaHelper.MapVisitaBrokerSuscriptorToEmailDto(visitaAgregadaSuscripcion, cliente, broker, suscripcion);

                List<string> destinatarios = new List<string>();

                if (broker != null && broker.Email != null && broker.Email != "")
                {
                    destinatarios.Add(broker.Email);
                }
                if (cliente != null && cliente.Mail != null && cliente.Mail != "")
                {
                    destinatarios.Add(cliente.Mail);
                }
                if (suscripcion != null && suscripcion.EmailUsuario != null && suscripcion.EmailUsuario != "")
                {
                    destinatarios.Add(suscripcion.EmailUsuario);
                }

                string emailHtml =
                    await _viewRender.RenderToStringAsync("~/Template/agenda-visita-broker-suscriptor.cshtml",
                        visitaEmail);
                if (destinatarios.Count() > 0)
                {
                    _visitaBrokerSuscriptorService.SendEmailVisitaAgendada(emailHtml, destinatarios);
                }

                _visitaBrokerSuscriptorService.SendEmailVisitaAgendadaCopiaJefeVentas(emailHtml);
            }            

            return Ok(_responseHelper.ReturnOkResponse(visitaAgregada));
        }

        [HttpPost("AgendarVisitaAgente")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgendarVisitaAgente(VisitaAgenteAgregarDto visita)
        {
            var agente = await _usuarioService.Get(new ObjectId(visita.AgenteId));
            if (agente == null)
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponse("El id del agente no existe!")));
            }

            var usuario = await _usuarioService.Get(new ObjectId(visita.UsuarioId));
            
            if (usuario == null)
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponse("El id del usuario no existe!")));
            }

            var visitaAgenteAgregar = _mapper.Map<VisitaAgente>(visita);

            var proyecto = await _proyectoInmobiliarioService.Get(new ObjectId(visita.ProyectoId));

            visitaAgenteAgregar.NombreProyecto = proyecto.Nombre;

            // se agregan datos del agente que no son enviados desde el request
            // refactorizar los dto
            _agendaHelper.MapAgenteVisitaAgente(agente, visitaAgenteAgregar);

            var respuestaServicio = await _visitaAgenteService.Add(visitaAgenteAgregar);

            var visitaAgregada = _mapper.Map<VisitaAgenteDto>(respuestaServicio);

            _agendaHelper.MapUsuarioVisitaAgente(usuario, visitaAgregada);

            var inmobiliaria = await _inmobiliariaRepository.Get(new ObjectId(proyecto.InmobiliariaId));

            visitaAgregada.UrlLogoInmobiliaria = inmobiliaria.Logo != null ? inmobiliaria.Logo.DownloadLink : "";
            visitaAgregada.UrlLive = _configuration.GetSection("LiveConfiguracion:UrlLive").Value;
            visitaAgregada.UrlBackoffice = _configuration.GetSection("LiveConfiguracion:UrlBackoffice").Value;

            string mailCliente =
                await _viewRender.RenderToStringAsync("~/Template/agenda-agente-notifica-cliente.cshtml",
                    visitaAgregada);            

            string mailAgente =
                await _viewRender.RenderToStringAsync("~/Template/agenda-agente-notifica-agente.cshtml",
                    visitaAgregada);

            _visitaAgenteService.SendEmailVisitaAgendada(mailCliente, new List<string>() { usuario.Email });

            _visitaAgenteService.SendEmailVisitaAgendada(mailAgente, new List<string>() { agente.Email });

            return Ok(Json(_responseHelper.ReturnOkResponse(visitaAgregada)));
        }

        [HttpPost("AgendarVisitaFotografo")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgendarVisitaFotografo(VisitaFotografoAgregarDto visita)
        {
            var fotografo = await _usuarioService.Get(new ObjectId(visita.FotografoId));

            var usuarioCliente = await _usuarioService.Get(new ObjectId(visita.ClienteId));

            var visitaFotografoAgregar = _mapper.Map<VisitaFotografo>(visita);

            // se agregan datos del fotógrafo que no son enviados desde el request
            // refactorizar los dto
            _agendaHelper.MapFotografoVisitaFotografo(fotografo, visitaFotografoAgregar);

            var respuestaServicio = await _visitaFotografoService.Add(visitaFotografoAgregar);

            var visitaAgregada = _mapper.Map<VisitaFotografoDto>(respuestaServicio);

            _agendaHelper.MapUsuarioVisitaFotografo(usuarioCliente, visitaAgregada);

            string mailCliente =
                await _viewRender.RenderToStringAsync("~/Template/agenda-fotografo-notifica-cliente.cshtml",
                    visitaAgregada);

            _visitaFotografoService.SendEmailVisitaAgendada(mailCliente, new List<string>() { usuarioCliente.Email });

            string mailFotografo =
                await _viewRender.RenderToStringAsync("~/Template/agenda-fotografo-notifica-fotografo.cshtml",
                    visitaAgregada);

            _visitaFotografoService.SendEmailVisitaAgendada(mailFotografo, new List<string>() { fotografo.Email });

            string mailJefeVentas =
                await _viewRender.RenderToStringAsync("~/Template/agenda-fotografo-copia-jefeventas.cshtml",
                    visitaAgregada);

            _visitaFotografoService.SendEmailVisitaAgendadaCopiaJefeVentas(mailJefeVentas);

            return Ok(Json(_responseHelper.ReturnOkResponse(visitaAgregada)));
        }

        [HttpPost("AgendarVisitaBrokerSuscriptor")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> AgendarVisitaBrokerSuscriptor(VisitaBrokerSuscriptorAgregarDto visita)
        {
            var broker = await _usuarioService.Get(new ObjectId(visita.IdBroker));

            var suscripcion = await _suscripcionService.Get(new ObjectId(visita.IdSuscripcion));

            var propiedad = await _propiedadService.Get(new ObjectId(visita.PropiedadId));

            var propietario = await _clienteService.Get(new ObjectId(visita.ClienteId));
            //var propietario = await _usuarioService.Get(new ObjectId(visita.ClienteId));

            if (propietario != null)
            {
                visita.NombrePropietario = $"{propietario.Nombres} {propietario.Apellidos}";
            }

            var visitaBrokerSuscriptorAgregar = _mapper.Map<VisitaBrokerSuscriptor>(visita);

            var respuestaServicio = await _visitaBrokerSuscriptorService.Add(visitaBrokerSuscriptorAgregar);

            var visitaAgregada = _mapper.Map<VisitaBrokerSuscriptorDto>(respuestaServicio);

            var visitaEmail = _agendaHelper.MapVisitaBrokerSuscriptorToEmailDto(visitaBrokerSuscriptorAgregar, propietario, broker, suscripcion);

            List<string> destinatarios = new List<string>();

            if (broker != null && broker.Email != null && broker.Email != "")
            {
                destinatarios.Add(broker.Email);
            }
            if (propietario != null && propietario.Mail != null && propietario.Mail != "")
            {
                destinatarios.Add(propietario.Mail);
            }
            if (suscripcion != null && suscripcion.EmailUsuario != null && suscripcion.EmailUsuario != "")
            {
                destinatarios.Add(suscripcion.EmailUsuario);
            }

            string emailHtml =
                await _viewRender.RenderToStringAsync("~/Template/agenda-visita-broker-suscriptor.cshtml",
                    visitaEmail);
            if (destinatarios.Count() > 0)
            {
                _visitaBrokerSuscriptorService.SendEmailVisitaAgendada(emailHtml, destinatarios);
            }

            _visitaBrokerSuscriptorService.SendEmailVisitaAgendadaCopiaJefeVentas(emailHtml);
            
            return Ok(Json(_responseHelper.ReturnOkResponse(visitaAgregada)));
        }

        [HttpGet("VerificaVisitaFotografo")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> VerificaVisitaFotografo(string userid)
        {
            string clienteId = await _usuarioService.GetClienteId(new ObjectId(userid));

            var agendaFotografo = await _visitaFotografoService.GetByClienteId(clienteId);

            if (agendaFotografo.Any())
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponse("Ya tiene una visita agendada")));
            }

            return Ok(Json(_responseHelper.ReturnOkResponse("", "")));
        }

        #endregion AgentarVisita

        #region CancelarVisita

        [HttpGet("CancelarVisita")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> CancelarVisita(string visitaId)
        {
            if (string.IsNullOrWhiteSpace(visitaId))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(visitaId))));
            }

            var visitaAgendada = await _visitaUsuarioService.Get(new ObjectId(visitaId));

            _visitaUsuarioService.Delete(new ObjectId(visitaId));

            string mailHtml = await _viewRender.RenderToStringAsync("~/Template/agenda-visita-cancelada.cshtml", null);

            var usuario = await _usuarioService.Get(new ObjectId(visitaAgendada.UsuarioId));
            var cliente = await _clienteService.Get(new ObjectId(visitaAgendada.ClienteId));

            _visitaUsuarioService.SendEmailVisitaCancelada(mailHtml, new List<string>() { usuario.Email, cliente.Mail });

            var visitaAgendadaMail = _agendaHelper.MapToEmailDto(visitaAgendada, usuario, cliente);
            string mailHtmlJefeVentas = await _viewRender.RenderToStringAsync("~/Template/agenda-visita-cancelada-copia-jefeventas.cshtml", visitaAgendadaMail);
            _visitaUsuarioService.SendEmailVisitaCanceladaCopiaJefeVentas(mailHtmlJefeVentas);

            return Ok(Json(_responseHelper.ReturnOkResponse(null)));
        }

        [HttpDelete("CancelarVisitaAgente")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> CancelarVisitaAgente(string visitaId)
        {
            if (string.IsNullOrWhiteSpace(visitaId))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(visitaId))));
            }

            var visitaAgendada = await _visitaAgenteService.Get(new ObjectId(visitaId));

            _visitaAgenteService.Delete(new ObjectId(visitaId));

            var visitaEliminada = _mapper.Map<VisitaAgenteDto>(visitaAgendada);

            var proyecto = await _proyectoInmobiliarioService.Get(new ObjectId(visitaAgendada.ProyectoId));

            visitaEliminada.InmobiliariaId = proyecto.InmobiliariaId;
            visitaEliminada.UrlLive = _configuration.GetSection("LiveConfiguracion:UrlLive").Value;

            string mailHtml = await _viewRender.RenderToStringAsync("~/Template/agenda-agente-visita-cancelada.cshtml", visitaEliminada);

            var agente = await _usuarioService.Get(new ObjectId(visitaAgendada.AgenteId));
            var usuario = await _usuarioService.Get(new ObjectId(visitaAgendada.ClienteId));

            _visitaAgenteService.SendEmailVisitaCancelada(mailHtml, new List<string>() { agente.Email, usuario.Email });

            return Ok(Json(_responseHelper.ReturnOkResponse(null)));
        }

        [HttpGet("CancelarVisitaFotografo")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> CancelarVisitaFotografo(string visitaId)
        {
            if (string.IsNullOrWhiteSpace(visitaId))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(visitaId))));
            }

            var visitaAgendada = await _visitaFotografoService.Get(new ObjectId(visitaId));

            _visitaFotografoService.Delete(new ObjectId(visitaId));

            string mailHtml = await _viewRender.RenderToStringAsync("~/Template/agenda-visita-cancelada.cshtml", null);

            var cliente = await _clienteService.Get(new ObjectId(visitaAgendada.ClienteId));
            var usuarioCliente = await _usuarioService.Get(new ObjectId(visitaAgendada.ClienteId));

            if (cliente != null)
            {
                _visitaFotografoService.SendEmailVisitaCancelada(mailHtml, new List<string>() { cliente.Mail });

            } else
            {
                if (usuarioCliente != null)
                {
                    _visitaFotografoService.SendEmailVisitaCancelada(mailHtml, new List<string>() { usuarioCliente.Email });
                }
            }

            var visitaFotografo = _mapper.Map<VisitaFotografoDto>(visitaAgendada);

            string mailFotografo = await _viewRender.RenderToStringAsync(
                "~/Template/agenda-fotografo-notifica-fotografo-visita-cancelada.cshtml", visitaFotografo);

            var fotografo = await _usuarioService.Get(new ObjectId(visitaAgendada.FotografoId));

            _visitaFotografoService.SendEmailVisitaCancelada(mailFotografo, new List<string>() { fotografo.Email });

            if (cliente != null)
            {
                var visitaFotografoMail = _agendaHelper.MapToEmailDto(visitaAgendada, fotografo, cliente);
                string mailHtmlJefeVentas = await _viewRender.RenderToStringAsync("~/Template/agenda-fotografo-cancelada-copia-jefeventas.cshtml", visitaFotografoMail);
                _visitaUsuarioService.SendEmailVisitaCanceladaCopiaJefeVentas(mailHtmlJefeVentas);
            } else
            {
                if (usuarioCliente != null)
                {
                    var visitaFotografoMail = _agendaHelper.MapToEmailDto(visitaAgendada, fotografo, usuarioCliente);
                    string mailHtmlJefeVentas = await _viewRender.RenderToStringAsync("~/Template/agenda-fotografo-cancelada-copia-jefeventas.cshtml", visitaFotografoMail);
                    _visitaUsuarioService.SendEmailVisitaCanceladaCopiaJefeVentas(mailHtmlJefeVentas);
                }
            }

            return Ok(Json(_responseHelper.ReturnOkResponse(null)));
        }

        #endregion

        #region GetBloques

        [HttpGet("GetBloquesAgente")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetBloquesAgente(string id, string proyectoId)
        {
            if (string.IsNullOrWhiteSpace(id) || string.IsNullOrWhiteSpace(proyectoId))
            {
                return Ok(Json("id o proyectoId no pueden ser nulos"));
            }

            var respuestaServicio = await _agendaAgenteService.Get(id, proyectoId);

            var bloquesAgente = _mapper.Map<AgendaDto>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(bloquesAgente)));
        }
        
        [HttpGet("GetAllBloquesAgenteByProjectId")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetAllBloquesAgenteByProjectId(string proyectoId)
        {
            var respuestaServicio = await _agendaAgenteService.GetAgendas(proyectoId);

            var bloquesAgente = _mapper.Map<IEnumerable<AgendaDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(bloquesAgente)));
        }

        [HttpGet("GetBloquesCliente")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetBloquesCliente()
        {
            var loggedUser = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUser.Name;

            var user = await _usuarioService.Get(new ObjectId(userId));
            if (user == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var respuestaServicio = await _agendaClienteService.Get(user.ClienteId);

            var agenda = _mapper.Map<AgendaDto>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(agenda)));
        }

        [HttpGet("GetBloquesClienteByPropiedadId")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetBloquesClienteByPropiedadId(string propiedadId)
        {
            if (string.IsNullOrWhiteSpace(propiedadId))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponse("id o proyectoId no pueden ser nulos")));
            }

            var respuestaServicio = await _agendaClienteService.GetByPropiedadId(propiedadId);

            var agenda = _mapper.Map<AgendaDto>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(agenda)));
        }

        [HttpGet("GetBloquesFotografo{id}")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetBloquesFotografo(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id))));
            }

            var respuestaServicio = await _agendaFotografoService.Get(id);

            var bloquesFotografo = _mapper.Map<AgendaDto>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(bloquesFotografo)));
        }

        [HttpGet("GetBloquesFotografos")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetBloquesFotografos()
        {
            var respuestaServicio = await _agendaFotografoService.GetAgendas();

            var bloquesFotografo = _mapper.Map<List<AgendaDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(bloquesFotografo)));
        }

        #endregion

        #region GetVisitas

        [HttpGet("GetVisitas")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetVisitas(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(id))));
            }

            var result = new Dictionary<string, dynamic>();

            string clienteId = await _usuarioService.GetClienteId(new ObjectId(id));

            // esto es necesario porque en la base de datos existen registros que hacen match cuando clienteId es null
            if (!string.IsNullOrEmpty(clienteId))
            {
                clienteId = id;
                var agendaFotografo = await _visitaFotografoService.GetByClienteId(clienteId);
                var agendaReservas = await _visitaUsuarioService.GetByClienteId(clienteId);

                result.Add("Fotografo", agendaFotografo);
                result.Add("VisitaPropiedad", agendaReservas);
            }

            var agendaUsuario = await _visitaUsuarioService.GetByUsuarioIdAndFecha(id, DateTime.Now.Date);

            result.Add("VisitaUsuario", agendaUsuario);

            return Ok(Json(_responseHelper.ReturnOkResponse(result)));
        }

        [HttpGet("GetVisitas/{id}/{fecha}")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetVisitas(string id, DateTime fecha)
        {
            var respuestaServicio = await _visitaUsuarioService.GetByClienteIdAndFecha(id, fecha);

            if (respuestaServicio.IsNullOrEmpty())
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var visitas = _mapper.Map<IEnumerable<VisitaUsuarioDto>>(respuestaServicio);

            List<string> tramos = new List<string>();

            foreach (var item in visitas)
            {
                tramos.Add(item.Tramo);
            }

            return Ok(Json(_responseHelper.ReturnOkResponse(tramos)));
        }

        [HttpGet("GetVisitasByPropiedadId")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetVisitasByPropiedadId(string idPropiedad)
        {
            var respuestaServicio = await _visitaUsuarioService.GetByPropiedadId(idPropiedad);

            if (respuestaServicio.IsNullOrEmpty())
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var visitas = _mapper.Map<IEnumerable<VisitaUsuarioDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(visitas)));
        }

        [HttpGet("FiltrarVisitas")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> FiltrarVisitas(string fechaInicial, string fechaFinal, string idBroker, string idSuscripcion, bool mostrarSoloSinConfirmar = true, bool mostrarSoloTramos = true, bool incluirVisitasPasadas = false, bool incluirVisitasFuturas = false)
        {
            var respuestaServicio = await _visitaUsuarioService.Filtrar(fechaInicial, fechaFinal, idBroker, idSuscripcion, mostrarSoloSinConfirmar, incluirVisitasPasadas, incluirVisitasFuturas);

            if (respuestaServicio.IsNullOrEmpty())
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var visitas = _mapper.Map<IEnumerable<VisitaUsuarioDto>>(respuestaServicio);

            if (mostrarSoloTramos)
            {
                List<string> tramos = new List<string>();

                foreach (var item in visitas)
                {
                    tramos.Add(item.Tramo);
                }

                return Ok(Json(_responseHelper.ReturnOkResponse(tramos)));
            }

            return Ok(Json(_responseHelper.ReturnOkResponse(visitas)));
        }

        [HttpGet("GetVisitasFotografo")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetVisitasFotografo()
        {
            var respuestaServicio = await _visitaFotografoService.GetAll();

            if (respuestaServicio.IsNullOrEmpty())
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var visitas = _mapper.Map<IEnumerable<VisitaFotografoDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(visitas)));
        }

        [HttpGet("GetVisitasFotografoByFotografoId")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetVisitasFotografo(string id)
        {
            var respuestaServicio = await _visitaFotografoService.GetByFotografoId(id);

            if (respuestaServicio.IsNullOrEmpty())
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var visitas = _mapper.Map<IEnumerable<VisitaFotografoDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(visitas)));
        }

        [HttpGet("GetVisitasAgente")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetVisitasAgente(string id)
        {
            var respuestaServicio = (await _visitaAgenteService.GetByAgenteId(id)).OrderBy(v=>v.Fecha).ThenBy(v=>v.Tramo);

            if (respuestaServicio.IsNullOrEmpty())
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var visitas = _mapper.Map<IEnumerable<VisitaAgenteDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(visitas)));
        }

        [HttpGet("GetCitaUsuario")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetCitaUsuario(string usuarioId, string proyectoInmobiliarioId)
        {
            var respuestaServicio = await _visitaAgenteService.GetByUserIdAndProjectId(usuarioId, proyectoInmobiliarioId);

            if (respuestaServicio == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var cita = _mapper.Map<CitaUsuarioDto>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(cita)));
        }

        [HttpGet("GetCitasProyecto")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetCitasProyecto(string proyectoInmobiliarioId)
        {
            var respuestaServicio = await _visitaAgenteService.GetByProjectId( proyectoInmobiliarioId);

            if (respuestaServicio == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var cita = _mapper.Map<IEnumerable<CitaUsuarioDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(cita)));
        }

        [HttpGet("GetVisitasFotografo/{fecha}")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetVisitasFotografo(DateTime fecha)
        {
            var respuestaServicio = await _visitaFotografoService.GetByFecha(fecha);

            if (respuestaServicio.IsNullOrEmpty())
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            var visitas = _mapper.Map<IEnumerable<VisitaFotografoDto>>(respuestaServicio);
            var visitasResumidas = _mapper.Map<IEnumerable<VisitaFotografoResponseDto>>(visitas);

            return Ok(Json(_responseHelper.ReturnOkResponse(visitasResumidas)));
        }

        #endregion

        #region UpdateBloques

        [HttpPut("UpdateBloquesAgente")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UpdateBloquesAgente(IEnumerable<BloqueAgenteAgregarDto> bloques)
        {
            var bloque = bloques.FirstOrDefault();

            var bloquesAgente = await _bloqueAgenteService.GetByAgenteIdAndProyectoId(bloque.AgenteId, bloque.ProyectoId);

            if (string.IsNullOrWhiteSpace(bloque.AgenteId) || string.IsNullOrWhiteSpace(bloque.ProyectoId))
                return Ok(Json(_responseHelper.ReturnBadRequestResponse("idAgente/proyectoId no pueden ser nulos")));
            foreach (var bloqueAgente in bloquesAgente)
            {
                _bloqueAgenteService.Delete(bloqueAgente.Id);
            }

            var bloquesAgenteParaAgregar = _mapper.Map<IEnumerable<BloqueAgente>>(bloques);

            var respuestaServicio = await _bloqueAgenteService.Add(bloquesAgenteParaAgregar);

            var bloquesAgenteAgregados = _mapper.Map<IEnumerable<BloqueAgenteDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(bloquesAgenteAgregados)));

        }

        [HttpPut("UpdateBloquesCliente")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UpdateBloquesCliente(IEnumerable<BloqueClienteAgregarDto> bloque)
        {
            var idPropiedad = bloque.FirstOrDefault()?.PropiedadId;

            var bloquesCliente = await _bloqueClienteService.GetByPropiedadId(idPropiedad);

            foreach (var bloqueCliente in bloquesCliente)
            {
                _bloqueClienteService.Delete(bloqueCliente.Id);
            }

            var bloqueParaAgregar = _mapper.Map<IEnumerable<BloqueCliente>>(bloque);

            var respuestaServicio = await _bloqueClienteService.Add(bloqueParaAgregar);

            var bloqueAgregado = _mapper.Map<IEnumerable<BloqueClienteDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(bloqueAgregado)));
        }

        [HttpPut("UpdateBloquesFotografo")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UpdateBloquesFotografo(IEnumerable<BloqueFotografoAgregarDto> bloquesFotografo)
        {
            var idFotografo = bloquesFotografo.FirstOrDefault()?.FotografoId;

            var bloqueFotografos = await _bloqueFotografoService.GetByFotografoId(idFotografo);

            foreach (var bloqueFotografo in bloqueFotografos)
            {
                _bloqueFotografoService.Delete(bloqueFotografo.Id);
            }

            var bloquesFotografoParaAgregar = _mapper.Map<IEnumerable<BloqueFotografo>>(bloquesFotografo);

            var respuestaServicio = await _bloqueFotografoService.Add(bloquesFotografoParaAgregar);

            var bloquesFotografoAgregados = _mapper.Map<IEnumerable<BloqueFotografoDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(bloquesFotografoAgregados)));
        }

        [HttpPut("UpdateVisitas")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UpdateVisitas(IEnumerable<VisitaUsuarioDto> visitas)
        {
            var visitasUsuarioParaActualizar = new List<VisitaUsuario>();

            foreach (var visita in visitas)
            {
                var visitaUsuario = _mapper.Map<VisitaUsuario>(visita);

                visitasUsuarioParaActualizar.Add(visitaUsuario);
            }

            var respuestaServicio = await _visitaUsuarioService.Update(visitasUsuarioParaActualizar);

            foreach (var visitaActualizada in respuestaServicio)
            {
                if (!_agendaHelper.AsisteAnfitiron(visitaActualizada.Anfitrion))
                {
                    continue;
                }

                string mailHtml =
                    await _viewRender.RenderToStringAsync("~/Template/agenda-visita-anfitrion-asiste.cshtml",
                        visitaActualizada);

                var usuario = await _usuarioService.Get(new ObjectId(visitaActualizada.UsuarioId));

                _visitaUsuarioService.SendEmailAnfitrionAsiste(mailHtml, new List<string>() { usuario.Email });
            }

            var visitasActualizadas = _mapper.Map<IEnumerable<VisitaUsuarioDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(visitasActualizadas)));
        }

        [HttpPut("UpdateVisitasFotografo")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UpdateVisitasFotografo(IEnumerable<VisitaFotografoDto> visitas)
        {
            var visitasFotogradoParaActualizar = new List<VisitaFotografo>();

            foreach (var visita in visitas)
            {
                var visitaFotografo = _mapper.Map<VisitaFotografo>(visita);

                visitasFotogradoParaActualizar.Add(visitaFotografo);
            }

            var respuestaServicio = await _visitaFotografoService.Update(visitasFotogradoParaActualizar);

            var visitasFotogradoActualizadas = _mapper.Map<IEnumerable<VisitaFotografoDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(visitasFotogradoActualizadas)));
        }

        #endregion

        [HttpPost("GetHorarioClientesConServicioAnfitrion")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetHorarioClientesConServicioAnfitrion()
        {
            var respuestaServicio = await _visitaUsuarioService.GetHorarioClientesConServicioAnfitrion();

            var visitasUsuario = _mapper.Map<IEnumerable<VisitaUsuarioDto>>(respuestaServicio);

            return Ok(Json(_responseHelper.ReturnOkResponse(visitasUsuario)));
        }

        [HttpPost("IncrementarVisitaVirtual")]
        [AllowAnonymous]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> IncrementarCantidadVisitasVirtuales(VisitaVirtualIncrementarDto visitaVirtualIncrementarDto)
        {
            var respuestaServicio = await _visitaVirtualService.IncrementarCantidadVisitas(visitaVirtualIncrementarDto.IdPropiedad, 
                visitaVirtualIncrementarDto.MesAnioVisita);

            return Ok(Json(_responseHelper.ReturnOkResponse(respuestaServicio)));
        }

        [HttpGet("GetVisitasVirtualesByPropiedadAndPeriodo")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> GetVisitasVirtualesByPropiedadAndMesAnio(string IdPropiedad,  string Periodo)
        {
            var respuestaServicio = await _visitaVirtualService.GetByPropiedadIdAndMesAnio(IdPropiedad, Periodo);

            if (respuestaServicio == null)
            {
                return Ok(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            return Ok(Json(_responseHelper.ReturnOkResponse(respuestaServicio)));
        }

        [HttpPut("UpdateBloquesNuevosRangosVisita")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> UpdateBloquesNuevosRangosVisita()
        {
            var bloquesCliente = await _bloqueClienteService.GetAll();
            //var bloquesAgente = await _bloqueAgenteService.GetAll();
            //var bloquesFotografo = await _bloqueFotografoService.GetAll();

            if (bloquesCliente != null && bloquesCliente.Count() > 0)
            {
                foreach (var bc in bloquesCliente)
                {
                    string horaInicio = bc.Tramo.Split("-")[0];
                    string horaInicioMinutos = horaInicio.Split(":")[1];

                    string horaTermino = bc.Tramo.Split("-")[1];
                    string horaTerminoMinutos = horaTermino.Split(":")[1];

                    if (horaInicioMinutos == "00" && horaTerminoMinutos == "00")
                    {
                        string horaInicioHora = horaInicio.Split(":")[0];

                        string newTramo = string.Concat(new List<string> { horaInicio, "-", horaInicioHora, ":30" });
                        bc.Tramo = newTramo;
                    }
                }
            }
            /*
            if (bloquesAgente != null && bloquesAgente.Count() > 0)
            {
                foreach (var ba in bloquesAgente)
                {
                    string horaInicio = ba.Tramo.Split("-")[0];
                    string horaInicioMinutos = horaInicio.Split(":")[1];

                    string horaTermino = ba.Tramo.Split("-")[1];
                    string horaTerminoMinutos = horaTermino.Split(":")[1];

                    if (horaInicioMinutos == "00" && horaTerminoMinutos == "00")
                    {
                        string horaInicioHora = horaInicio.Split(":")[0];

                        string newTramo = string.Concat(new List<string> { horaInicio, "-", horaInicioHora, ":30" });
                        ba.Tramo = newTramo;
                    }
                }
            }
            
            if (bloquesFotografo != null && bloquesFotografo.Count() > 0)
            {
                foreach (var bf in bloquesFotografo)
                {
                    string horaInicio = bf.Tramo.Split("-")[0];
                    string horaInicioMinutos = horaInicio.Split(":")[1];

                    string horaTermino = bf.Tramo.Split("-")[1];
                    string horaTerminoMinutos = horaTermino.Split(":")[1];

                    if (horaInicioMinutos == "00" && horaTerminoMinutos == "00")
                    {
                        string horaInicioHora = horaInicio.Split(":")[0];

                        string newTramo = string.Concat(new List<string> { horaInicio, "-", horaInicioHora, ":30" });
                        bf.Tramo = newTramo;
                    }
                }
            }
            */

            var respuestaServicioBloqueClientes = await _bloqueClienteService.Update(bloquesCliente);
            //var respuestaServicioBloqueAgentes = await _bloqueAgenteService.Update(bloquesCliente);
            //var respuestaServicioBloqueFotografos = await _bloqueFotografoService.Update(bloquesCliente);

            return Ok(Json(_responseHelper.ReturnOkResponse(respuestaServicioBloqueClientes)));
        }

        [HttpPut("ConfirmarVisita")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> ConfirmarVisita(string idVisita, bool realizada)
        {
            if (string.IsNullOrWhiteSpace(idVisita))
            {
                return BadRequest(Json(_responseHelper.ReturnBadRequestResponse("idAgente/proyectoId no pueden ser nulos")));
            }

            var visita = await _visitaBrokerSuscriptorService.Get(new ObjectId(idVisita));
            
            if (visita == null)
            {
                return NotFound(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            visita.VisitaRealizada = realizada;
            visita.VisitaVerificada = true;

            var visitaActualizada = await _visitaBrokerSuscriptorService.Update(visita);

            return Ok(Json(_responseHelper.ReturnOkResponse(visitaActualizada)));
        }

    }
}