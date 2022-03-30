using AutoMapper;
using Corretaje.Api.Commons;
using Corretaje.Api.Commons.Agenda;
using Corretaje.Api.Commons.Imagen;
using Corretaje.Api.Commons.Oferta;
using Corretaje.Api.Commons.Propiedad;
using Corretaje.Api.Commons.SecurityHelper;
using Corretaje.Api.Commons.Tasacion;
using Corretaje.Api.Cron;
using Corretaje.Api.Dto;
using Corretaje.Api.Dto.Evaluar;
using Corretaje.Api.Dto.Zoom;
using Corretaje.Api.Middleware;
using Corretaje.Api.Render;
using Corretaje.Api.Seed;
using Corretaje.Api.Validations;
using Corretaje.Common.ApiClient;
using Corretaje.Common.BlobService;
using Corretaje.Common.EMail;
using Corretaje.Common.FTP;
using Corretaje.Common.Pdf;
using Corretaje.Domain;
using Corretaje.Domain.Agenda;
using Corretaje.Domain.Evaluar;
using Corretaje.Domain.Tasacion;
using Corretaje.Domain.Zoom;
using Corretaje.Repository;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IAgenda;
using Corretaje.Service.IServices.IBackoffice;
using Corretaje.Service.IServices.IBloqueService.IBloqueAgente;
using Corretaje.Service.IServices.IBloqueService.IBloqueCliente;
using Corretaje.Service.IServices.IBloqueService.IBloqueFotografo;
using Corretaje.Service.IServices.IBusqueda;
using Corretaje.Service.IServices.IEvaluar;
using Corretaje.Service.IServices.ILogin;
using Corretaje.Service.IServices.INotaCredito;
using Corretaje.Service.IServices.IOferta;
using Corretaje.Service.IServices.IOrdenCompra;
using Corretaje.Service.IServices.IPlan;
using Corretaje.Service.IServices.IPropiedad;
using Corretaje.Service.IServices.IProyectoInmobiliario;
using Corretaje.Service.IServices.IRecuperarCuenta;
using Corretaje.Service.IServices.ISBIF;
using Corretaje.Service.IServices.IServicio;
using Corretaje.Service.IServices.ISuscripcion;
using Corretaje.Service.IServices.ITasacion;
using Corretaje.Service.IServices.ITicket;
using Corretaje.Service.IServices.IUsuario;
using Corretaje.Service.IServices.IValidador;
using Corretaje.Service.IServices.IValoracionUsuario;
using Corretaje.Service.IServices.IVisita.IVisitaAgente;
using Corretaje.Service.IServices.IVisita.IVisitaFotografo;
using Corretaje.Service.IServices.IVisita.IVisitaUsuario;
using Corretaje.Service.IServices.IZoom;
using Corretaje.Service.Services;
using Corretaje.Service.Services.Agenda;
using Corretaje.Service.Services.Backoffice;
using Corretaje.Service.Services.BloqueService;
using Corretaje.Service.Services.BloqueService.BloqueAgente;
using Corretaje.Service.Services.BloqueService.BloqueCliente;
using Corretaje.Service.Services.BloqueService.BloqueFotografo;
using Corretaje.Service.Services.Busqueda;
using Corretaje.Service.Services.Cliente;
using Corretaje.Service.Services.ConversionMoneda;
using Corretaje.Service.Services.Hangfire;
using Corretaje.Service.Services.Login;
using Corretaje.Service.Services.Login.Provider.Facebook;
using Corretaje.Service.Services.Login.Provider.Google;
using Corretaje.Service.Services.NotaCredito;
using Corretaje.Service.Services.Oferta;
using Corretaje.Service.Services.Oferta.Validador;
using Corretaje.Service.Services.OrdenCompra;
using Corretaje.Service.Services.OrdenCompra.Validador;
using Corretaje.Service.Services.Plan;
using Corretaje.Service.Services.Propiedad;
using Corretaje.Service.Services.Provider;
using Corretaje.Service.Services.ProyectosInmobiliario;
using Corretaje.Service.Services.Recomendacion;
using Corretaje.Service.Services.RecuperarCuenta;
using Corretaje.Service.Services.SBIF;
using Corretaje.Service.Services.Servicio;
using Corretaje.Service.Services.Suscripcion;
using Corretaje.Service.Services.Tasacion;
using Corretaje.Service.Services.Ticket;
using Corretaje.Service.Services.Usuario;
using Corretaje.Service.Services.ValoracionUsuario;
using Corretaje.Service.Services.Visita.VisitaAgente;
using Corretaje.Service.Services.Visita.VisitaFotografo;
using Corretaje.Service.Services.Visita.VisitaUsuario;
using Corretaje.Service.Services.Reporte;
using Corretaje.Service.Services.Zoom;
using DinkToPdf;
using DinkToPdf.Contracts;
using FluentValidation;
using FluentValidation.AspNetCore;
using Hangfire;
using Hangfire.Storage;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerUI;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using Corretaje.Service.IServices.IProper;
using Twilio.Clients;
using Corretaje.Service.IServices.IReporte;
using Corretaje.Service.IServices.ITarjetaProp;
using Corretaje.Service.Services.Proper;
using Corretaje.Service.Services.TarjetaProp;
using System.Reflection;
using System.IO;
using Corretaje.Common.Excel;
using Corretaje.Service.Services.DatosTasacion;
using Corretaje.Domain.PropiedadesPI;
using Corretaje.Service.Services.PropiedadesPI;
using Corretaje.Service.Services.PropiedadesPI.PropiedadesPINatural;
using Corretaje.Service.Services.PropiedadesPI.PropiedadesPIInmobiliaria;
using Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPIInmobiliaria;
using Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPINatural;
using Corretaje.Service.Services.Visita.VisitaVirtual;
using Corretaje.Service.IServices.IVisita.IVisitaVirtual;
using Corretaje.Service.Services.Visita.VisitaBrokerSuscriptor;
using Corretaje.Service.IServices.IVisita.IVisitaBrokerSuscriptor;
using Corretaje.Service.Services.Embajador;
using Corretaje.Service.IServices.IEmbajador;
using Corretaje.Service.Services.Broker;
using Corretaje.Service.IServices.IBroker;
using Corretaje.Api.Commons.Usuario;
using Corretaje.Service.Services.DatosTasacion.DatosTasacionArriendo;
using Corretaje.Service.Services.DatosTasacion.DatosTasacionVenta;
using Corretaje.Service.IServices.IDatosTasacion.IDatosTasacionArriendo;
using Corretaje.Service.IServices.IDatosTasacion.IDatosTasacionVenta;
using Corretaje.Service.Services.PropiedadesPI.PropiedadesPIArriendo;
using Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPIArriendo;
using Corretaje.Service.Services.LandingInmobiliaria;
using Corretaje.Service.IServices.ILandingInmobiliaria;
using Corretaje.Api.Commons.LandingInmobiliaria;

namespace Corretaje.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddControllersAsServices()
                .AddFluentValidation();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Title = "Propins API",
                    Version = "v1",
                    Description = "API para los servicios de Propins",
                    Contact = new Contact()
                    {
                        Name = "Belén Cespedes",
                        Email = "belencatalina.cespedes@gmail.com",
                        Url = new Uri("https://www.propins.cl/").ToString(),
                    },
                });
                c.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Description =
                        "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            services.Configure<VisionDto>(Configuration.GetSection("ApiVisionUrl"));
            services.Configure<WebPayConfDto>(Configuration.GetSection("WebPayUrls"));

            var connectionString = Configuration.GetConnectionString("MongoConnectionString");
            var configuracionEmail = Configuration.GetSection("EmailConfiguration").Get<EMailConfiguration>();
            var configuracionHangfire = Configuration.GetSection("HangfireConfiguration").Get<HangfireConfiguration>();
            var configuracionFacebook = Configuration.GetSection("FacebookConfiguracion").Get<FacebookConfiguracion>();
            var configuracionGoogle = Configuration.GetSection("GoogleConfiguracion").Get<GoogleConfiguracion>();
            var configuracionLive = Configuration.GetSection("LiveConfiguracion").Get<LiveConfiguracion>();
            var configuracionOferta = Configuration.GetSection("OfertaConfiguration").Get<OfertaConfiguration>();
            var configuracionOrdenCompra = Configuration.GetSection("OrdenCompraConfiguracion").Get<OrdenCompraConfiguracion>();
            var configuracionPlan = Configuration.GetSection("PlanConfiguration").Get<PlanConfiguration>();
            var configuracionPropiedad = Configuration.GetSection("PropiedadConfiguracion").Get<PropiedadConfiguracion>();
            var configuracionRecuperarCuenta = Configuration.GetSection("RecuperarCuentaConfiguracion").Get<RecuperarCuentaConfiguracion>();
            var configuracionSbif = Configuration.GetSection("SBIFConfiguration").Get<SBIFConfiguration>();
            var configuracionTasacion = Configuration.GetSection("TasacionConfiguracion").Get<TasacionConfiguracion>();
            var configuracionTicket = Configuration.GetSection("TicketConfiguracion").Get<TicketConfiguracion>();
            var configurationToken = Configuration.GetSection("AppSetting").Get<TokenConfiguration>();
            var configuracionVisitaFotografo = Configuration.GetSection("VisitaFotografoConfiguracion").Get<VisitaFotografoConfiguracion>();
            var configuracionVisitaVirtual = Configuration.GetSection("VisitaVirtualConfiguracion").Get<VisitaVirtualConfiguracion>();
            var configuracionVisitaLive = Configuration.GetSection("VisitaAgenteConfiguracion").Get<VisitaAgenteConfiguracion>();
            var configuracionVisitaUsuario = Configuration.GetSection("VisitaUsuarioConfiguracion").Get<VisitaUsuarioConfiguracion>();
            var configuracionVisitaBrokerSuscriptor = Configuration.GetSection("VisitaBrokerSuscriptorConfiguracion").Get<VisitaBrokerSuscriptorConfiguracion>();
            var configuracionRecomendacion = Configuration.GetSection("RecomendacionConfiguracion").Get<RecomendacionConfiguracion>();
            var configuracionBlobStorage = Configuration.GetSection("RecomendacionConfiguracion").Get<RecomendacionConfiguracion>();
            var configuracionDatosTasacionArriendo = Configuration.GetSection("DatosTasacionArriendoConfiguracion").Get<DatosTasacionArriendoConfiguracion>();
            var configuracionDatosTasacionVenta = Configuration.GetSection("DatosTasacionVentaConfiguracion").Get<DatosTasacionVentaConfiguracion>();
            var configuracionSuscripcion = Configuration.GetSection("SuscripcionConfiguracion").Get<SuscripcionConfiguracion>();
            var configuracionUsuario = Configuration.GetSection("UsuarioConfiguracion").Get<UsuarioConfiguracion>();
            var configuracionPIPropiedadNatural = Configuration.GetSection("PIPropiedadNaturalConfiguracion").Get<PIPropiedadNaturalConfiguracion>();
            var configuracionPIPropiedadInmobiliaria = Configuration.GetSection("PIPropiedadInmobiliariaConfiguracion").Get<PIPropiedadInmobiliariaConfiguracion>();
            var configuracionPIPropiedadArriendo = Configuration.GetSection("PIPropiedadArriendoConfiguracion").Get<PIPropiedadArriendoConfiguracion>();
            var configuracionLandingInmobiliaria = Configuration.GetSection("LandingInmobiliariaConfiguracion").Get<LandingInmobiliariaConfiguracion>();

            var repositoryBloqueCliente = new Repository<BloqueCliente>(connectionString);
            var repositoryBloqueFotografo = new Repository<BloqueFotografo>(connectionString);
            var repositoryBusqueda = new Repository<Busqueda>(connectionString);
            var repositoryInmobiliaria = new Repository<Inmobiliaria>(connectionString);
            var repositoryProyectoInmobiliario = new Repository<ProyectoInmobiliario>(connectionString);
            var repositoryContrato = new Repository<Contrato>(connectionString);
            var repositoryNotaCredito = new Repository<NotaCredito>(connectionString);
            var repositoryOferta = new Repository<Oferta>(connectionString);
            var repositoryOrdenCompra = new Repository<OrdenDeCompra>(connectionString);
            var repositoryPlan = new Repository<Plan>(connectionString);
            var repositoryPropiedad = new Repository<Propiedad>(connectionString);
            var repositoryServicioAdicional = new Repository<ServicioAdicional>(connectionString);
            var repositoryServicioBase = new Repository<ServicioBase>(connectionString);
            var repositorySuscripcion = new Repository<Suscripcion>(connectionString);
            var repositoryUsuario = new Repository<Usuario>(connectionString);
            var repositoryUf = new Repository<Uf>(connectionString);
            var repositoryTasacion = new Repository<TasacionResult>(connectionString);
            var repositoryTicket = new Repository<Ticket>(connectionString);
            var repositoryValoracionUsuario = new Repository<ValoracionUsuario>(connectionString);
            var repositoryVisitaFotografo = new Repository<VisitaFotografo>(connectionString);
            var repositoryVisitaUsuario = new Repository<VisitaUsuario>(connectionString);
            var repositoryVistaAgente = new Repository<VisitaAgente>(connectionString);
            var repositoryVisitaVirtual = new Repository<VisitaVirtual>(connectionString);
            var repositoryVisitaBrokerSuscriptor = new Repository<VisitaBrokerSuscriptor>(connectionString);
            var repositoryEvaluarAnfitrionRepository = new Repository<EvaluarAnfitrion>(connectionString);
            var repositoryEvaluarProyectoRepository = new Repository<EvaluarProyectoInmobiliario>(connectionString);
            var repositoryReporte = new Repository<Reporte>(connectionString);
            var repositoryTarjetaProp = new Repository<TarjetaProp>(connectionString);
            var repositoryProper = new Repository<Propers>(connectionString);
            var repositoryReferidoProper = new Repository<ReferidoProper>(connectionString);
            var repositoryReferido = new Repository<Referidos>(connectionString);
            var repositoryDatosTasacionArriendo = new Repository<DatosTasacionArriendo>(connectionString);
            var repositoryDatosTasacionVenta = new Repository<DatosTasacionVenta>(connectionString);
            var repositoryPIPropiedadNatural= new Repository<PIPropiedadNatural>(connectionString);
            var repositoryPIPropiedadInmobiliaria = new Repository<PIPropiedadInmobiliaria>(connectionString);
            var repositoryPIPropiedadArriendo = new Repository<PIPropiedadArriendo>(connectionString);
            var repositoryEmbajador = new Repository<Embajador>(connectionString);
            var repositoryBroker = new Repository<Broker>(connectionString);
            var repositoryLandingInmobiliaria = new Repository<LandingInmobiliaria>(connectionString);

            var helperToken = new TokenHelper(configurationToken);

            var excelService = new ExcelToObjectList();
            var notaCreditoService = new NotaCreditoService(repositoryNotaCredito);
            var servicioAdicionalQueryFiltro = new ServicioQueryFiltro<ServicioAdicional>();
            var servicioBaseQueryFiltro = new ServicioQueryFiltro<ServicioBase>();
            var propiedadPINaturalQueryFiltro = new PIPropiedadQueryFiltro<PIPropiedadNatural>();
            var propiedadPIInmobiliariaQueryFiltro = new PIPropiedadQueryFiltro<PIPropiedadInmobiliaria>();
            var propiedadPIArriendoQueryFiltro = new PIPropiedadQueryFiltro<PIPropiedadArriendo>();
            var propiedadPINaturalService = new PIPropiedadNaturalService(excelService, propiedadPINaturalQueryFiltro, repositoryPIPropiedadNatural, configuracionPIPropiedadNatural);
            var propiedadPIInmobiliariaService = new PIPropiedadInmobiliariaService(excelService, propiedadPIInmobiliariaQueryFiltro, repositoryPIPropiedadInmobiliaria, configuracionPIPropiedadInmobiliaria);
            var propiedadPIArriendoService = new PIPropiedadArriendoService(excelService, propiedadPIArriendoQueryFiltro, repositoryPIPropiedadArriendo, configuracionPIPropiedadArriendo);
            var apiClient = new ApiClient();
            var clienteService = new ClienteService(new ClienteQueryFiltro(), new Repository<Cliente>(connectionString));
            var emailService = new EMailService(configuracionEmail);
            var pdfService = new PdfCreador();
            var respuestaDelServicio = new RespuestaDelServicio();
            var datosTasacionArriendoQueryFiltro = new DatosTasacionQueryFiltro<DatosTasacionArriendo>();
            var datosTasacionVentaQueryFiltro = new DatosTasacionQueryFiltro<DatosTasacionVenta>();
            var datosTasacionArriendoService = new DatosTasacionArriendoService(repositoryDatosTasacionArriendo,  datosTasacionArriendoQueryFiltro, configuracionDatosTasacionArriendo, excelService);
            var datosTasacionVentaService = new DatosTasacionVentaService(repositoryDatosTasacionVenta, datosTasacionVentaQueryFiltro, configuracionDatosTasacionVenta, excelService);
            var usuarioService = new UsuarioService(clienteService, repositoryUsuario, respuestaDelServicio, new UsuarioCuenta(), new UsuarioQueryFiltro(), new UsuarioEmail(emailService, configuracionUsuario));
            var properService = new ProperService(repositoryProper, new ProperQueryFiltro(), respuestaDelServicio, repositoryReferido);
            var embajadorService = new EmbajadorService(repositoryEmbajador);
            var brokerService = new BrokerService(repositoryBroker, new BrokerQueryFiltro());
            var referidoService = new ReferidoService(repositoryReferidoProper, new ReferidoQueryFiltro(), repositoryReferido);
            var bloqueClienteService = new BloqueClienteService(new BloqueClienteQueryFiltro(), repositoryBloqueCliente);
            var bloqueFotografoService = new BloqueFotografoService(new BloqueFotografoQueryFiltro(), repositoryBloqueFotografo);
            var loginService = new LoginService(new FacebookToken(apiClient, new FacebookUrl(configuracionFacebook)), new GoogleToken(apiClient, new GoogleUrl(configuracionGoogle)));
            var ofertaEmision = new OfertaEmsion();
            var ofertaEstado = new OfertaEstado();
            var ofertaQueryFiltro = new OfertaQueryFiltro(configuracionOferta);
            var ofertaMonto = new OfertaMonto();
            var ofertaValidadorEsUnica = new OfertaValidadorEsUnica(ofertaQueryFiltro, repositoryOferta);
            var ofertaValidadorMontoMaximo = new OfertaValidadorMontoMaximo();
            var ofertaValidadorMontoMinimo = new OfertaValidadorMontoMinimo(configuracionOferta);
            var ofertaValidadorCotaInferior = new OfertaValidadorCotaInferior();
            var ofertaValidadorCotaSuperior = new OfertaValidadorCotaSuperior();
            var ofertaValidadorMultipleEmision = new OfertaValidadorMultipleEmision(repositoryOferta);
            var ofertaValidadorOfertadorDistintoPropietario = new OfertaValidadorOfertadorDistintoPropietario();
            var ofertaValidadoresActualizar = new List<IValidador<Oferta>>
            {
                ofertaValidadorCotaInferior, ofertaValidadorCotaSuperior, ofertaValidadorOfertadorDistintoPropietario,
                ofertaValidadorMultipleEmision
            };
            var ofertaValidadoresAgregar = new List<IValidador<Oferta>>
            {
                ofertaValidadorEsUnica, ofertaValidadorMontoMaximo, ofertaValidadorMontoMinimo,
                ofertaValidadorOfertadorDistintoPropietario
            };
            var backofficeLoginValidadores = new List<IValidador<Usuario>>
            {
                new ValidadorAccederBackoffice()
            };
            var ofertaService = new OfertaService(configuracionOferta, new OfertaCriterioVisualizacion(), ofertaEmision,
                ofertaEstado, ofertaQueryFiltro, repositoryOferta, ofertaMonto,
                new OfertaSendEMail(clienteService, emailService, configuracionOferta, usuarioService));
            var propiedadFecha = new PropiedadFecha(configuracionPropiedad);
            var propiedadEmail = new PropiedadEmail(emailService, configuracionPropiedad);
            var sbifService = new SBIFService(apiClient, configuracionSbif, repositoryUf);
            var ordenCompraService = new OrdenCompraService(new CalculoPrecioServicioAdicional(new ConversionMoneda(sbifService)), notaCreditoService, new OrdenCompraCliente(clienteService, usuarioService), new OrdenCompraEstado(), new OrdenCompraQueryFiltro(), new OrdenCompraSendEmail(emailService, configuracionOrdenCompra, usuarioService), repositoryOrdenCompra);
            var busquedaQueryFiltro = new BusquedaQueryFiltro();
            var tasacionQueryFiltro = new TasacionQueryFiltro();
            var visitaFotografoService = new VisitaFotografoService(repositoryVisitaFotografo, new VisitaFotografoEmail(emailService, configuracionVisitaFotografo), new VisitaFotografoQueryFiltro(), usuarioService);
            var visitaAgenteService = new VisitaAgenteService(repositoryVistaAgente, new VisitaAgenteEmail(emailService, configuracionVisitaLive), new VisitaAgenteQueryFiltro(), usuarioService);
            var visitaUsuarioService = new VisitaUsuarioService(ordenCompraService, repositoryVisitaUsuario, usuarioService, new VisitaUsuarioEmail(emailService, configuracionVisitaUsuario), new VisitaUsuarioQueryFiltro());
            var visitaVirtualService = new VisitaVirtualService(repositoryVisitaVirtual, new VisitaVirtualEmail(emailService, configuracionVisitaVirtual), new VisitaVirtualQueryFiltro());
            var visitaBrokerSuscriptorService = new VisitaBrokerSuscriptorService(repositoryVisitaBrokerSuscriptor, new VisitaBrokerSuscriptorEmail(emailService, configuracionVisitaBrokerSuscriptor), new VisitaBrokerSuscriptorQueryFiltro(), usuarioService);
            var propiedadPropietario = new PropiedadPropietario(visitaFotografoService, visitaUsuarioService, ofertaService, repositoryPropiedad);
            var propiedadService = new PropiedadService(propiedadEmail, new PropiedadQueryFiltro(), propiedadFecha, propiedadPropietario, connectionString);
            var tarjetaPropService = new TarjetaPropServices(connectionString, new TarjetaPropQueryFiltro());
            var busquedaService = new BusquedaService(busquedaQueryFiltro, propiedadService, repositoryBusqueda);
            var suscripcionService = new SuscripcionService(repositorySuscripcion, new SuscripcionQueryFiltro(), excelService, propiedadPIInmobiliariaService, propiedadPINaturalService, propiedadPIArriendoService, propiedadService, configuracionSuscripcion, new SuscripcionSendEMail(emailService, usuarioService, configuracionSuscripcion));
            var recomendacionEmail = new RecomendacionEmail(emailService, configuracionRecomendacion);
            //var recomendacionService = new RecomendacionService(busquedaService, propiedadService, recomendacionEmail, suscripcionService);
            var inmobiliariaService = new InmobiliariaService(repositoryInmobiliaria, configuracionLive);
            var proyectoInmobiliarioService = new ProyectoInmobiliarioService(repositoryInmobiliaria, repositoryProyectoInmobiliario, new ProyectoInmobiliarioQueryFiltro(), configuracionLive);
            var reporteService = new ReporteService(repositoryInmobiliaria, repositoryProyectoInmobiliario, repositoryEvaluarProyectoRepository, repositoryEvaluarAnfitrionRepository, repositoryUsuario, new ReporteQueryFiltro(), repositoryReporte, emailService, pdfService);
            var landingInmobiliariaService = new LandingInmobiliariaService(repositoryLandingInmobiliaria, new LandingInmobiliariaQueryFiltro());

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            services.AddHttpClient<ITwilioRestClient, SmsHelper>();
            services.AddScoped<IAgendaAgenteService, AgendaAgenteService>();
            services.AddScoped<IBackofficeLoginValidador, BackofficeLoginValidador>(resolverImplementacionCon => new BackofficeLoginValidador(backofficeLoginValidadores));
            services.AddScoped<IBloqueAgenteQueryFiltro, BloqueAgenteQueryFiltro>();
            services.AddScoped<IBloqueAgenteService, BloqueAgenteService>();
            services.AddScoped<IEvaluarAnfitrionService, EvaluarAnfitrionService>(resolverImplementacionCon => new EvaluarAnfitrionService(connectionString));
            services.AddScoped<IEvaluarProyectoService, EvaluarProyectoInmobiliarioService>(resolverImplementacionCon => new EvaluarProyectoInmobiliarioService(connectionString));
            services.AddScoped<IInmobiliariaService, InmobiliariaService>();
            services.AddScoped<IOfertaValidadorActualizar<Oferta>, OfertaValidadorActualizar>(resolverImplementacionCon => new OfertaValidadorActualizar(ofertaValidadoresActualizar));
            services.AddScoped<IOrdenCompraValidador, OrdenCompraValidador>(resolverImplementacionCon => new OrdenCompraValidador(new List<IValidador<OrdenDeCompra>>() { new OrdenCompraValidadorLimitePlanesComprar(ordenCompraService) }));
            services.AddScoped<IOrdenCompraValidadorAgregarServicioAdicional, OrdenCompraValidadorAgregarServicioAdicional>(resolverImplementacionCon => new OrdenCompraValidadorAgregarServicioAdicional(new List<IValidador<OrdenDeCompra>>() { new OrdenCompraValidadorServicioAdicionalUnico() }));
            services.AddScoped<IOfertaValidadorAgregar<Oferta>, OfertaValidadorAgregar>(resolverImplementacionCon => new OfertaValidadorAgregar(ofertaValidadoresAgregar));
            services.AddScoped<IProyectoInmobiliarioService, ProyectoInmobiliarioService>();
            services.AddScoped<IProyectoInmobiliarioQueryFiltro, ProyectoInmobiliarioQueryFiltro>();
            services.AddScoped<IRepository<BloqueAgente>, Repository<BloqueAgente>>(resolveWith => new Repository<BloqueAgente>(connectionString));
            services.AddScoped<IRepository<VisitaAgente>, Repository<VisitaAgente>>(resolveWith => new Repository<VisitaAgente>(connectionString));
            services.AddScoped<IRepository<Inmobiliaria>, Repository<Inmobiliaria>>(resolveWith => new Repository<Inmobiliaria>(connectionString));
            services.AddScoped<IRepository<ProyectoInmobiliario>, Repository<ProyectoInmobiliario>>(resolveWith => new Repository<ProyectoInmobiliario>(connectionString));
            services.AddScoped<IRepository<Usuario>, Repository<Usuario>>(resolveWith => new Repository<Usuario>(connectionString));
            services.AddScoped<IRepository<ZoomMeeting>, Repository<ZoomMeeting>>(resolveWith => new Repository<ZoomMeeting>(connectionString));
            services.AddScoped<IRepository<Reporte>, Repository<Reporte>>(resolveWith => new Repository<Reporte>(connectionString));
            services.AddScoped<IViewRender, ViewRender>();
            services.AddScoped<IVisitaAgenteConfiguracion, VisitaAgenteConfiguracion>();
            services.AddScoped<IVisitaAgenteEmail, VisitaAgenteEmail>();
            services.AddScoped<IVisitaAgenteQueryFiltro, VisitaAgenteQueryFiltro>();
            services.AddScoped<IVisitaAgenteService, VisitaAgenteService>();
            services.AddScoped<IZoomService, ZoomService>();
            services.AddSingleton(Configuration);
            services.AddSingleton<IAgendaClienteService>(new AgendaClienteService(bloqueClienteService));
            services.AddSingleton<ISuscripcionService>(suscripcionService);
            services.AddSingleton<IAgendaFotografoService>(new AgendaFotografoService(bloqueFotografoService));
            services.AddSingleton<IAgendaHelper>(new AgendaHelper());
            services.AddSingleton<IApiClient>(apiClient);
            services.AddSingleton<IBloqueClienteService>(bloqueClienteService);
            services.AddSingleton<IBloqueFotografoService>(bloqueFotografoService);
            services.AddSingleton<IBusquedaService>(busquedaService);
            services.AddSingleton<IClienteService>(clienteService);
            services.AddSingleton<IContratoHelper>(new ContratoHelper());
            services.AddSingleton<IContratoService>(new ContratoService(ofertaService, repositoryContrato));
            services.AddSingleton<ICounterService>(new CounterService(connectionString));
            services.AddSingleton<ICrearBoucher, CrearBoucher>();
            services.AddSingleton<IEncriptacionHelper>(new EncriptacionHelper());
            services.AddSingleton<IEMailService>(emailService);
            services.AddSingleton<IHorarioService>(new HorarioService(connectionString));
            services.AddSingleton<IImagenHelper>(new ImagenHelper());
            services.AddSingleton<ILoginService>(loginService);
            services.AddSingleton<IInmobiliariaService>(inmobiliariaService);
            services.AddSingleton<IProyectoInmobiliarioService>(proyectoInmobiliarioService);
            services.AddSingleton<IReporteService>(reporteService);
            services.AddSingleton<IMapHelper>(new MapHelper());
            services.AddSingleton<ILandingInmobiliariaHelper>(new LandingInmobiliariaHelper(configuracionLandingInmobiliaria));
            services.AddSingleton<INotaCreditoService>(notaCreditoService);
            services.AddSingleton<IOfertaConfiguration>(configuracionOferta);
            services.AddSingleton<IOfertaHelper>(new OfertaHelper(configuracionOferta));
            services.AddSingleton<IOfertaEmision>(ofertaEmision);
            services.AddSingleton<IOfertaService>(ofertaService);
            services.AddSingleton<IOperacionService>(new OperacionService(connectionString));
            services.AddSingleton<IOrdenCompraService>(ordenCompraService);
            services.AddSingleton<IPdfCreador>(new PdfCreador());
            services.AddSingleton<IPIPropiedadInmobiliariaService>(propiedadPIInmobiliariaService);
            services.AddSingleton<IPIPropiedadNaturalService>(propiedadPINaturalService);
            services.AddSingleton<IPIPropiedadArriendoService>(propiedadPIArriendoService);
            services.AddSingleton<IDatosTasacionArriendoService>(datosTasacionArriendoService);
            services.AddSingleton<IDatosTasacionVentaService>(datosTasacionVentaService);
            services.AddSingleton<IPlanesYServiciosHelper>(new PlanesYServiciosHelper());
            services.AddSingleton<IPlanService>(new PlanService(configuracionPlan, repositoryPlan, new RespuestaDelServicio()));
            services.AddSingleton<IPortalInmobiliarioService>(new PortalInmobiliarioService(connectionString));
            services.AddSingleton<IPropiedadConfiguracion>(configuracionPropiedad);
            services.AddSingleton<IPropiedadHelper>(new PropiedadHelper());
            services.AddSingleton<IPropiedadService>(propiedadService);
            services.AddSingleton<ITarjetaPropService>(tarjetaPropService);
            services.AddSingleton<IRecuperarCuentaService>(new RecuperarCuentaService(new RecuperarCuentaEmail(emailService, configuracionRecuperarCuenta), new RecuperarCuentaEstado(), new RecuperarCuentaExpiracion(configuracionRecuperarCuenta), new RecuperarCuentaLink(configuracionRecuperarCuenta), new RecuperarCuentaQueryFiltro(), new RecuperarCuentaGuid(), new Repository<RecuperarCuenta>(connectionString), respuestaDelServicio, usuarioService));
            services.AddSingleton<IRegionesService>(new RegionesService(connectionString));
            //services.AddSingleton<IRecomendacionService>(recomendacionService);
            services.AddSingleton<IResponseHelper>(new ResponseHelper());
            services.AddSingleton<ISBIFService>(sbifService);
            services.AddSingleton<IServicioService<ServicioAdicional>>(new ServicioAdicionalService<ServicioAdicional>(repositoryServicioAdicional, respuestaDelServicio, servicioAdicionalQueryFiltro));
            services.AddSingleton<IServicioService<ServicioBase>>(new ServicioBaseService<ServicioBase>(repositoryServicioBase, respuestaDelServicio, servicioBaseQueryFiltro));
            services.AddSingleton<ITicketService>(new TicketService(emailService, repositoryUsuario, repositoryTicket, configuracionTicket));
            services.AddSingleton<ITasacionConfiguracion>(configuracionTasacion);
            services.AddSingleton<ITasacionHelper>(new TasacionHelper());
            services.AddSingleton<ITasacionService>(new TasacionService(repositoryTasacion, tasacionQueryFiltro, configuracionTasacion));
            services.AddSingleton<ITipoContratoService>(new TipoContratoService(connectionString));
            services.AddSingleton<ITokenConfiguration>(configurationToken);
            services.AddSingleton<ITokenHelper>(helperToken);
            services.AddSingleton<IUsuarioService>(usuarioService);
            services.AddSingleton<IProperService>(properService);
            services.AddSingleton<IReferidoService>(referidoService);
            services.AddSingleton<IValoracionUsuarioService>(new ValoracionUsuarioService(new ValoracionUsuarioQueryFiltro(), repositoryValoracionUsuario));
            services.AddSingleton<IVisitaFotografoService>(visitaFotografoService);
            services.AddSingleton<IVisitaUsuarioService>(visitaUsuarioService);
            services.AddSingleton<IVisitaVirtualService>(visitaVirtualService);
            services.AddSingleton<IVisitaBrokerSuscriptorService>(visitaBrokerSuscriptorService);
            services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
            services.AddSingleton<IEmbajadorService>(embajadorService);
            services.AddSingleton<IBrokerService>(brokerService);
            services.AddSingleton<ILandingInmobiliariaService>(landingInmobiliariaService);
            services.AddSingleton<IUsuarioHelper>(new UsuarioHelper(configuracionUsuario));
            services.AddTransient<IFtpService, FtpService>();
            services.AddTransient<IBlobService, BlobService>();
            services.AddTransient<IValidator<AgentDto>, AgentValidation>();
            services.AddTransient<IValidator<EvaluarAnfitrionDto>, EvaluarAnfitrionValidator>();
            services.AddTransient<IValidator<EvaluarProyectoInmobiliarioDto>, EvaluarProyectoInmobiliarioValidator>();
            services.AddTransient<IValidator<InmobiliariaDto>, InmobiliariaValidator>();
            services.AddTransient<IValidator<ZoomMeetingDto>, AddZoomMeetingValidator>();

            // configure jwt authentication

            var key = Encoding.ASCII.GetBytes(configurationToken.Secret);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateAudience = false,
                        ValidateIssuer = false,
                        ValidateIssuerSigningKey = true,
                        ValidateLifetime = true
                    };
                });

            // test
            // services.AddHangfire(x => x.UseMemoryStorage());
            services.AddHangfire(config => { config.UseSqlServerStorage(configuracionHangfire.SqlConnection); });
            services.AddAutoMapper();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        [Obsolete]
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            SetCultureInfo();
            //Exception Middleware
            app.ConfigureCustomExceptionMiddleware();
            app.UseAuthentication();
            app.UseCors("CorsPolicy");
            if (!env.IsDevelopment()) app.UseHsts();

            app.UseHttpsRedirection();

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Propins API");
                c.RoutePrefix = string.Empty;
                c.DocExpansion(DocExpansion.None);
            });

            app.UseMvc();

            app.UseCors(builder =>
                builder.WithOrigins("*"));


            var cnnString = Configuration.GetSection("ConnectionStrings:MongoConnectionString").Value;
            var iPropiedadQuery = new PropiedadQueryFiltro();

            if (env.IsProduction())
            {
                app.UseHangfireDashboard();
                app.UseHangfireServer();

                using (var connection = JobStorage.Current.GetConnection())
                {
                    foreach (var recurringJob in connection.GetRecurringJobs())
                        RecurringJob.RemoveIfExists(recurringJob.Id);
                    connection.Dispose();

                    /*
                    RecurringJob.AddOrUpdate<IRecomendacionService>(
                        x => x.EnviarRecomendaciones(), "0 0 * * *");
                        */
                    RecurringJob.AddOrUpdate<IOfertaService>(x => x.EliminarOfertasCaducadas(), "0 0 * * *");
                    RecurringJob.AddOrUpdate<ISBIFService>(x => x.UpdateUf(), "0 0 * * *");
                    RecurringJob.AddOrUpdate<IPropiedadService>(x => x.NotificarPropiedadesPorExpirar(), "0 0 * * *");

                    RecurringJob.AddOrUpdate<IReporteService>(x => x.GeneraReportes(), "59 23 * * 0");

                    //publicación portal inmobiliario
                    //TODO: llevar a service...
                    var delayedJob = new DelayedJobs(env,
                        new PropiedadService(iPropiedadQuery, cnnString),
                        new FtpService(),
                        new PortalInmobiliarioService(cnnString));
                    RecurringJob.AddOrUpdate(() => delayedJob.PublicarPropiedadesFtp(),
                        Hangfire.Cron.MinuteInterval(15));
                }
            }

            Seeds.Initialize(new Repository<Configuracion>(cnnString));
        }

        private static void SetCultureInfo()
        {
            var cultureInfo = new CultureInfo("es-CL") { NumberFormat = { CurrencySymbol = "$" } };
            CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
            CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;
        }
    }
}