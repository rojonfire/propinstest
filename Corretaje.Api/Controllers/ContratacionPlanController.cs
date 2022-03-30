using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Commons.Agenda;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Agenda;
using Corretaje.Api.Dto.ContratacionPlan;
using Corretaje.Api.Render;
using Corretaje.Common.EMail;
using Corretaje.Domain;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IBloqueService.IBloqueCliente;
using Corretaje.Service.IServices.IPlan;
using Corretaje.Service.IServices.IPropiedad;
using Corretaje.Service.IServices.IServicio;
using Corretaje.Service.IServices.ITarjetaProp;
using Corretaje.Service.IServices.IUsuario;
using Corretaje.Service.IServices.IVisita.IVisitaFotografo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ContratacionPlanController : Controller
    {
        private readonly IMapHelper _mapHelper;
        private readonly IMapper _mapper;
        private readonly IResponseHelper _responseHelper;
        private readonly IUsuarioService _usuarioService;
        private readonly IPlanService _planService;
        private readonly IServicioService<ServicioAdicional> _servicioAdicionalService;
        private readonly IPropiedadService _propiedadService;
        private readonly ITarjetaPropService _tarjetaPropService;
        private readonly ICounterService _counterService;
        private readonly IAgendaHelper _agendaHelper;
        private readonly IVisitaFotografoService _visitaFotografoService;
        private readonly IViewRender _viewRender;
        private readonly IBloqueClienteService _bloqueClienteService;
        private readonly IEMailService _eMailService;
        private readonly IClienteService _clienteService;

        public ContratacionPlanController(IMapHelper mapHelper, IMapper mapper, IResponseHelper responseHelper,
            IUsuarioService usuarioService, IPlanService planService, IServicioService<ServicioAdicional> servicioAdicionalService,
            IPropiedadService propiedadService, ITarjetaPropService tarjetaPropService, ICounterService counterService, IAgendaHelper agendaHelper,
            IVisitaFotografoService visitaFotografoService, IViewRender viewRender, IBloqueClienteService bloqueClienteService, IEMailService eMailService,
            IClienteService clienteService)
        {
            _mapHelper = mapHelper;
            _mapper = mapper;
            _responseHelper = responseHelper;
            _usuarioService = usuarioService;
            _planService = planService;
            _servicioAdicionalService = servicioAdicionalService;
            _propiedadService = propiedadService;
            _tarjetaPropService = tarjetaPropService;
            _counterService = counterService;
            _agendaHelper = agendaHelper;
            _visitaFotografoService = visitaFotografoService;
            _viewRender = viewRender;
            _bloqueClienteService = bloqueClienteService;
            _eMailService = eMailService;
            _clienteService = clienteService;
        }

        /// <summary>
        /// Vincula al usuario a un plan elegido
        /// </summary>
        /// /// <remarks>
        /// IMPORTANTE! 
        /// Para obtener los servicios adicionales contratados por el usuario, se debe sacar la información del campo "ServiciosAdicionalesContratados".
        /// NO confundir con el campo "ServiciosAdicionales" que se encuentra dentro del campo Plan.
        /// </remarks>

        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> ContratarPlan(AgregarContratacionPlanDto contratacionPlan)
        {
            var loggedUser = HttpContext.User.Identity as ClaimsIdentity;
            string userId = loggedUser.Name;
            contratacionPlan.IdUsuario = userId;
            var plan = await _planService.GetPlanById(new ObjectId(contratacionPlan.IdPlan));
            if (plan == null)
            {
                return NotFound(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            contratacionPlan.NombrePlan = plan.Nombre;

            Propiedad propiedad = _mapHelper.MapToPropiedad(contratacionPlan);
            propiedad.PlanContratado = plan;
            propiedad.EstadoPropiedad = Estados.EstadoPropiedad.PlanContratado;
            contratacionPlan.ValorTotalAdicionales = 0;

            var usuario = await _usuarioService.Get(new ObjectId(userId));

            if (usuario.ClienteId == null)
            {
                var cliente = await _clienteService.GetClienteByEmail(usuario.Email);
                if (cliente == null)
                {
                    cliente = _mapHelper.MapUsuarioToCliente(usuario);
                    var clienteAgregado = await _clienteService.Add(cliente);
                    propiedad.IdCliente = clienteAgregado.Id.ToString();
                }
                else
                {
                    propiedad.IdCliente = cliente.Id.ToString();
                }
            } else
            {
                propiedad.IdCliente = usuario.ClienteId;
            }
            

            if (contratacionPlan.ServiciosAdicionales != null && contratacionPlan.ServiciosAdicionales.Any() == true)
            {
                HashSet<ObjectId> diffids = new HashSet<ObjectId>(plan.ServiciosAdicionales.Select(s => s.Id));
                var serviciosAdicionalesContratados = contratacionPlan.ServiciosAdicionales.Where(t => diffids.Contains(new ObjectId(t)));
                var idCollection = _mapHelper.MapToObjectId(serviciosAdicionalesContratados);
                var serviciosAdicionales = await _servicioAdicionalService.GetServiciosAdicionalesById(idCollection);
                propiedad.ServiciosAdicionalesContratados = (ICollection<ServicioAdicional>)serviciosAdicionales;
                decimal valorTotalAdicionales = propiedad.ServiciosAdicionalesContratados.Sum(k => k.Precio);
                contratacionPlan.ValorTotalAdicionales = valorTotalAdicionales;
                contratacionPlan.ServiciosAdicionalesDetail = (List<ServicioAdicional>)serviciosAdicionales;
            }

            var count = await _counterService.GetSequenceValue("item_id");
            propiedad.CodigoPropiedad = "PROP_" + count;

            if (propiedad.IdFotografo != null && propiedad.FechaVisitaFotografoString != null)
            {
                if (propiedad.FechaVisitaFotografoString.Contains("T"))
                {
                    propiedad.FechaVisitaFotografo = DateTime.Now.AddDays(1);
                }
                else
                {
                    string[] partesFecha = propiedad.FechaVisitaFotografoString.Split("-");
                    int anio = int.Parse(partesFecha[0]);
                    int mes = int.Parse(partesFecha[1]);
                    int dia = int.Parse(partesFecha[2]);
                    propiedad.FechaVisitaFotografo = new DateTime(anio, mes, dia);
                }

            }

            var respuestaPropiedad = await _propiedadService.Add(propiedad);

            if (!plan.Fast && contratacionPlan.IdFotografo != null)
            {
                var fotografo = await _usuarioService.Get(new ObjectId(contratacionPlan.IdFotografo));

                string IdPropiedad = respuestaPropiedad.Id.ToString();

                var visitaFotografoAgregar = _mapHelper.MapToVisitaFotografo(contratacionPlan, fotografo, userId, IdPropiedad);

                // se agregan datos del fotógrafo que no son enviados desde el request
                // refactorizar los dto
                _agendaHelper.MapFotografoVisitaFotografo(fotografo, visitaFotografoAgregar);

                var respuestaServicio = await _visitaFotografoService.Add(visitaFotografoAgregar);

                var visitaAgregada = _mapper.Map<VisitaFotografoDto>(respuestaServicio);

                _agendaHelper.MapUsuarioVisitaFotografo(usuario, visitaAgregada);

                string mailCliente =
                    await _viewRender.RenderToStringAsync("~/Template/agenda-fotografo-notifica-cliente.cshtml",
                        visitaAgregada);

                _visitaFotografoService.SendEmailVisitaAgendada(mailCliente, new List<string>() { usuario.Email });

                string mailFotografo =
                    await _viewRender.RenderToStringAsync("~/Template/agenda-fotografo-notifica-fotografo.cshtml",
                        visitaAgregada);

                _visitaFotografoService.SendEmailVisitaAgendada(mailFotografo, new List<string>() { fotografo.Email });

                if (contratacionPlan.HorarioVisitas != null)
                {
                    var bloqueParaAgregar = _mapHelper.MapToBloqueCliente(contratacionPlan.HorarioVisitas, userId, IdPropiedad);
                    var respuestaBloqueCliente = await _bloqueClienteService.Add(bloqueParaAgregar);
                    var bloqueAgregado = _mapper.Map<IEnumerable<BloqueClienteDto>>(respuestaBloqueCliente);
                }

            }
            List<string> emailsDestinatarios = new List<string>();

            var jefesDeVenta = await _usuarioService.GetUsuariosByTipoCuenta(Estados.TipoCuenta.JefeDeVentas);
            if (jefesDeVenta != null && jefesDeVenta.Count() > 0)
            {
                emailsDestinatarios = jefesDeVenta.Where(i => i.Email != null && i.Email != "").Select(j => j.Email).ToList();
            }
            emailsDestinatarios.Add(usuario.Email);
            emailsDestinatarios.Add("mconsuegra@propins.cl");
            if (plan.Fast)
            {
                var mailHtml = await _viewRender.RenderToStringAsync("~/Template/plan_fast.cshtml", contratacionPlan);

                var mail = new EMail
                {
                    Content = mailHtml,
                    FromAddress = "contacto@propins.cl",
                    Subject = $"{usuario.Nombres}, has contratado tu nuevo plan con éxito",
                    ToAddresses = emailsDestinatarios
                };

                _eMailService.Send(mail);
            }
            else
            {
                var mailHtml = await _viewRender.RenderToStringAsync("~/Template/contrato_PLanes.cshtml", contratacionPlan);

                var mail = new EMail
                {
                    Content = mailHtml,
                    FromAddress = "contacto@propins.cl",
                    Subject = $"{usuario.Nombres}, has contratado tu nuevo plan con éxito",
                    ToAddresses = new List<string> { usuario.Email }
                };

                _eMailService.Send(mail);
            }

            return Ok(Json(_responseHelper.ReturnOkResponse(respuestaPropiedad, "Se ha contratado el plan con éxito")));
        }

        [HttpPost("ContratarServiciosAdicionales")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> ContratarServiciosAdicionales(string IdPropiedad, IEnumerable<string> IdServiciosAdicionales)
        {
            if (string.IsNullOrWhiteSpace(IdPropiedad))
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(IdPropiedad))));
            }

            var propiedad = await _propiedadService.Get(new ObjectId(IdPropiedad));
            if (propiedad == null)
            {
                return NotFound(Json(_responseHelper.ReturnNotFoundResponse()));
            }

            if (IdServiciosAdicionales != null && IdServiciosAdicionales.Count() > 0)
            {
                List<string> serviciosAdicionalesActuales = new List<string>();

                if (propiedad.ServiciosAdicionalesContratados != null && propiedad.ServiciosAdicionalesContratados.Count() > 0)
                {
                    foreach (var s in propiedad.ServiciosAdicionalesContratados)
                    {
                        serviciosAdicionalesActuales.Add(s.Id.ToString());
                    }
                }

                foreach (var t in IdServiciosAdicionales)
                {
                    serviciosAdicionalesActuales.Add(t);
                }

                var idCollection = _mapHelper.MapToObjectId(serviciosAdicionalesActuales);
                var serviciosAdicionales = await _servicioAdicionalService.GetServiciosAdicionalesById(idCollection);
                propiedad.ServiciosAdicionalesContratados = (ICollection<ServicioAdicional>)serviciosAdicionales;

                var respuesta = await _propiedadService.Update(propiedad);
                return Ok(Json(_responseHelper.ReturnOkResponse(respuesta, "Se han contratado los servicios adicionales con éxito")));
            } else
            {
                return Ok(Json(_responseHelper.ReturnBadRequestResponseByMissingId(nameof(IdServiciosAdicionales))));
            }

        }
    }

}