using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Corretaje.Common.EMail;
using Corretaje.Common.Extension;
using Corretaje.Common.Pdf;
using Corretaje.Domain;
using Corretaje.Domain.Evaluar;
using Corretaje.Repository;
using Corretaje.Service.IServices.IReporte;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Corretaje.Service.Services.Reporte
{
    public class ReporteService : IReporteService
    {
        private readonly IRepository<Inmobiliaria> _inmobiliarioRepository;
        private readonly IRepository<ProyectoInmobiliario> _proyectoInmobiliarioRepository;
        private readonly IRepository<EvaluarProyectoInmobiliario> _evaluarProyectoInmobiliarioRepository;
        private readonly IRepository<EvaluarAnfitrion> _evaluarAnfitrionRepository;
        private readonly IRepository<Domain.Reporte> _reporteRepository;
        private readonly IRepository<Domain.Usuario> _usuarioRepository;
        private readonly IReporteQueryFiltro _reporteQueryFiltro;
        private readonly IEMailService _emailService;
        private readonly IPdfCreador _pdfCreador;

        public ReporteService(
            IRepository<Inmobiliaria> inmobiliarioRepository,
            IRepository<ProyectoInmobiliario> proyectoInmobiliarioRepository,
            IRepository<EvaluarProyectoInmobiliario> evaluarProyectoInmobiliarioRepository,
            IRepository<EvaluarAnfitrion> evaluarAnfitrionRepository,
            IRepository<Domain.Usuario> usuarioRepository,
            IReporteQueryFiltro reporteQueryFiltro,
            IRepository<Domain.Reporte> reporteRepository,
            IEMailService emailService,
            IPdfCreador pdfCreador
            )
        {
            _inmobiliarioRepository = inmobiliarioRepository;
            _proyectoInmobiliarioRepository = proyectoInmobiliarioRepository;
            _reporteQueryFiltro = reporteQueryFiltro;
            _evaluarProyectoInmobiliarioRepository = evaluarProyectoInmobiliarioRepository;
            _usuarioRepository = usuarioRepository;
            _evaluarAnfitrionRepository = evaluarAnfitrionRepository;
            _reporteRepository = reporteRepository;
            _emailService = emailService;
            _pdfCreador = pdfCreador;
        }

        public async Task<Domain.Reporte> Create(ObjectId proyectoInmobiliarioId, DateTime inicioPeriodo, DateTime terminoPeriodo)
        {
            var reporte = new Domain.Reporte();

            var proyecto = await _proyectoInmobiliarioRepository.Get(proyectoInmobiliarioId);

            var inmobiliaria = await _inmobiliarioRepository.Get(new ObjectId(proyecto.InmobiliariaId));

            if (inmobiliaria == null)
            {
                throw new Exception($"No exiten {nameof(Inmobiliaria)} id {proyecto.InmobiliariaId}");
            }

            reporte.NombreInmobiliaria = inmobiliaria.Nombre;
            reporte.NombreProyectoInmobiliario = proyecto.Nombre;
            reporte.InmobiliariaId = proyecto.InmobiliariaId;
            reporte.InicioPeriodo = inicioPeriodo;
            reporte.TerminoPeriodo = terminoPeriodo;

            var filter = Builders<EvaluarProyectoInmobiliario>.Filter.Where(evaluacion => evaluacion.ProyectoInmobiliarioId == proyectoInmobiliarioId &&
                                                                                          evaluacion.CreatedAt >= inicioPeriodo &&
                                                                                          evaluacion.CreatedAt <= terminoPeriodo);
            var evaluacionProyectosInmobiliarios = await _evaluarProyectoInmobiliarioRepository.SearchFor(filter);

            if (evaluacionProyectosInmobiliarios.IsNullOrEmpty())
            {
                return reporte;
            }

            List<Visitante> visitantes = new List<Visitante>();

            foreach (var evaluavion in evaluacionProyectosInmobiliarios)
            {
                var visita = new Visitante();
                var usr = await _usuarioRepository.Get(evaluavion.EvaluadorId);

                var filt = Builders<EvaluarAnfitrion>.Filter.Where(evaluacion => evaluacion.EvaluadorId == usr.Id &&
                                                                                 evaluacion.ProyectoInmobiliarioId == proyectoInmobiliarioId.ToString() &&
                                                                                 evaluacion.CreatedAt >= inicioPeriodo &&
                                                                                 evaluacion.CreatedAt <= terminoPeriodo);
                var evaluacionAnfitrion = (await _evaluarAnfitrionRepository.SearchFor(filt)).OrderByDescending(e => e.CreatedAt).FirstOrDefault();

                visita.SetVisitante(usr, evaluavion, evaluacionAnfitrion != null ? evaluacionAnfitrion.Evaluacion : 0, evaluavion.CreatedAt, evaluavion.Duracion);
                visitantes.Add(visita);
            }

            List<Vendedor> vendadores = new List<Vendedor>();

            var filAgente = Builders<Domain.Usuario>.Filter.Where(usr => usr.TipoCuenta == Estados.TipoCuenta.Agente &&
                                                                                         usr.InmobiliariaId == proyecto.InmobiliariaId);

            var agentes = await _usuarioRepository.SearchFor(filAgente);

            foreach (var agente in agentes)
            {
                foreach (var proyectoid in agente.ProyectosInmobiliariosId)
                {
                    if (proyectoid == proyectoInmobiliarioId.ToString())
                    {
                        var vendedor = new Vendedor();
                        vendedor.SetVendedor(agente);
                        vendadores.Add(vendedor);
                    }
                }
            }

            foreach (var vendedor in vendadores)
            {
                var filt = Builders<EvaluarAnfitrion>.Filter.Where(evaluacion => evaluacion.AgenteId == vendedor.UsuarioId &&
                                                                                 evaluacion.ProyectoInmobiliarioId == proyectoInmobiliarioId.ToString() &&
                                                                                 evaluacion.CreatedAt >= inicioPeriodo &&
                                                                                 evaluacion.CreatedAt <= terminoPeriodo);
                var evaluacionesVendedor = await _evaluarAnfitrionRepository.SearchFor(filt);
                var cantidad = evaluacionesVendedor.Count() != 0 ? evaluacionesVendedor.Count() : 1;
                var suma = evaluacionesVendedor.Sum(e => e.Evaluacion);
                var divicion = (decimal)suma/ (decimal)cantidad;
                vendedor.SetPonderado(divicion);
            }

            var cant = evaluacionProyectosInmobiliarios.Count() != 0 ? evaluacionProyectosInmobiliarios.Count() : 1;

            Proyecto ponderado = new Proyecto();

            ponderado.SetPondConectividad(Convert.ToDecimal(evaluacionProyectosInmobiliarios.Sum(e => e.EvaluacionConectividad) / cant));
            ponderado.SetPondEquipamiento(Convert.ToDecimal(evaluacionProyectosInmobiliarios.Sum(e => e.EvaluacionEquipamiento) / cant));
            ponderado.SetPondRentabilidad(Convert.ToDecimal(evaluacionProyectosInmobiliarios.Sum(e => e.EvaluacionRentabilidad) / cant));
            ponderado.SetPondTerminaciones(Convert.ToDecimal(evaluacionProyectosInmobiliarios.Sum(e => e.EvaluacionTerminaciones) / cant));
            ponderado.SetPondVendedores(vendadores);
            ponderado.Visitantes = visitantes;

            ponderado.EvalProyectoPonderado = (ponderado.ConectividadPonderado + ponderado.EquipamientoPonderado + ponderado.TerminacionesPonderado + ponderado.RentabilidadPonderado) / 4;

            reporte.EvaluacionesProyecto = ponderado;

            return await _reporteRepository.Insert(reporte);
        }

        public async void SendEmail(ObjectId inmobiliariaId, string html, string fromAddress, List<string> toAddresses, string subject, List<Archivo> attachmentsByte)
        {
            var email = new EMail()
            {
                Content = html,
                FromAddress = fromAddress,
                Subject = subject,
                ToAddresses = toAddresses,
                AttachmentsByte = attachmentsByte
            };

            _emailService.Send(email);
        }

        public async Task<IEnumerable<Domain.Reporte>> GetReporteByQuery(ReporteQueryString query)
        {
            var reportes = await _reporteRepository.SearchFor(_reporteQueryFiltro.FiltroReporteByInmobiliariaId(query));

            return reportes;
        }

        public async Task<Domain.Reporte> GeneraReportes()
        {
            var inmobiliarias = await _inmobiliarioRepository.GetAll();
            var inicioPeriodo = DateTime.Now.AddDays(-7);
            var terminoPeriodo = DateTime.Now;

            var repo = new Domain.Reporte();

            foreach (var inmobiliaria in inmobiliarias)
            {
                var filter = Builders<ProyectoInmobiliario>.Filter.Where(pro => pro.InmobiliariaId == inmobiliaria.Id.ToString());
                var proyectos = await _proyectoInmobiliarioRepository.SearchFor(filter);

                foreach (var proyecto in proyectos)
                {
                    var reporte = await Create(proyecto.Id, inicioPeriodo, terminoPeriodo);

                    if (reporte.EvaluacionesProyecto != null)
                    {
                        string htmlPdf = ContentPdf(reporte);
                        string htmlBody = ContentNotificacion(reporte);

                        var pdf = _pdfCreador.ConvertirHtmlAPdf(htmlPdf);
                        var fromAddress = "contacto@propins.cl";
                        var subject = "Reporte Semanal Propins Live";
                        var eMailAdmin = "Alvaro@propins.cl";
                        //var eMailAdmin = "cgalleguillos@cleveritgroup.com";

                        var toAddresses = new List<string>();

                        toAddresses.Add(inmobiliaria.Mail);
                        toAddresses.Add(eMailAdmin);

                        var attachs = new List<Archivo>();
                        attachs.Add(new Archivo()
                        {
                            FileName = $"Reporte_{reporte.NombreProyectoInmobiliario}_{reporte.TerminoPeriodo.ToString("ddMMyyyy")}.pdf",
                            Data = pdf
                        });
                        SendEmail(new ObjectId(reporte.InmobiliariaId), htmlBody, fromAddress, toAddresses, subject, attachs);
                    }else
                    {
                        continue;
                    }

                    
                }
            }
            return repo;
        }

        private string ContentNotificacion(Domain.Reporte reporte)
        {
            string nombreArchivo = @"./Template/ReporteNotificaBg.cshtml";
            string mailHtml = File.ReadAllText(nombreArchivo);
            mailHtml = mailHtml.Replace("[NOMBRE_INMOBILIARIA]", reporte.NombreInmobiliaria);
            mailHtml = mailHtml.Replace("[PERIODO]", ContentPeriodoNotificacion(reporte.InicioPeriodo, reporte.TerminoPeriodo));
            return mailHtml;
        }

        private string ContentPeriodoNotificacion(DateTime inicio, DateTime termino)
        {
            return $"{inicio.ToString("dd MMMM yyyy")} al {termino.ToString("dd MMMM yyyy")}";
        }

        private string ContentPdf(Domain.Reporte reporte)
        {
            string nombreArchivo = @"./Template/ReporteProyectoBg.cshtml";
            string mailHtml = File.ReadAllText(nombreArchivo);
            mailHtml = mailHtml.Replace("[NOMBRE_INMOBILIARIA]", reporte.NombreInmobiliaria);
            mailHtml = mailHtml.Replace("[PERIODO]", ContentPeriodo(reporte.InicioPeriodo, reporte.TerminoPeriodo));
            mailHtml = mailHtml.Replace("[NOMBRE_PROYECTO]", reporte.NombreProyectoInmobiliario);

            mailHtml = mailHtml.Replace("[B_PROYECTO]", Math.Round(reporte.EvaluacionesProyecto.EvalProyectoPonderado).ToString());
            mailHtml = mailHtml.Replace("[P_PROYECTO]", reporte.EvaluacionesProyecto.EvalProyectoPonderado.ToString());

            mailHtml = mailHtml.Replace("[B_EQUIPAMIENTO]", Math.Round(reporte.EvaluacionesProyecto.EquipamientoPonderado).ToString());
            mailHtml = mailHtml.Replace("[P_EQUIPAMIENTO]", reporte.EvaluacionesProyecto.EquipamientoPonderado.ToString());

            mailHtml = mailHtml.Replace("[B_TERMINACIONES]", Math.Round(reporte.EvaluacionesProyecto.TerminacionesPonderado).ToString());
            mailHtml = mailHtml.Replace("[P_TERMINACIONES]", reporte.EvaluacionesProyecto.TerminacionesPonderado.ToString());

            mailHtml = mailHtml.Replace("[B_CONECTIVIDAD]", Math.Round(reporte.EvaluacionesProyecto.ConectividadPonderado).ToString());
            mailHtml = mailHtml.Replace("[P_CONECTIVIDAD]", reporte.EvaluacionesProyecto.ConectividadPonderado.ToString());

            mailHtml = mailHtml.Replace("[B_RENTABILIDAD]", Math.Round(reporte.EvaluacionesProyecto.RentabilidadPonderado).ToString());
            mailHtml = mailHtml.Replace("[P_RENTABILIDAD]", reporte.EvaluacionesProyecto.RentabilidadPonderado.ToString());

            mailHtml = mailHtml.Replace("[B_RENTABILIDAD]", Math.Round(reporte.EvaluacionesProyecto.RentabilidadPonderado).ToString());
            mailHtml = mailHtml.Replace("[P_RENTABILIDAD]", reporte.EvaluacionesProyecto.RentabilidadPonderado.ToString());

            mailHtml = mailHtml.Replace("[VENDEDORES]", ContentVendedores(reporte.EvaluacionesProyecto.VendedoresPonderado));

            mailHtml = mailHtml.Replace("[CANTIDADUSUARIOS]", $"({reporte.EvaluacionesProyecto.Visitantes.Count()})");

            mailHtml = mailHtml.Replace("[VISITANTES]", ContentVisiatantes(reporte.EvaluacionesProyecto.Visitantes));

            return mailHtml;
        }

        private string ContentPeriodo(DateTime inicio, DateTime termino)
        {
            return $"{inicio.ToString("dd")} de {inicio.ToString("MMMM yyyy")} al {termino.ToString("dd")} de {termino.ToString("MMMM yyyy")}";
        }

        private string ContentVendedores(List<Vendedor> vendedores )
        {
            var content = "";

            foreach(var vendedor in vendedores)
            {
                content = content + $"<tr><td> {vendedor.Nombre} {vendedor.Apellido} </td>";
                content = content + "<td><div class='progress-five'>";
                content = content + $"<div class='bar-{Math.Round(vendedor.EvalPonderado)}'><span> {vendedor.EvalPonderado} </span> </div>";
                content = content + "</div></td></tr>";
            }

            return content;
        }

        private string ContentVisiatantes(List<Visitante> visitantes)
        {
            var content = "";

            foreach (var visita in visitantes)
            {
                content = content + $"<tr><td style ='font-size: 9px;'>" + (!string.IsNullOrEmpty(visita.Nombre) ? visita.Nombre : "" ) + "</td>";
                content = content + $"<td style='font-size: 9px;'>" + (!string.IsNullOrEmpty(visita.Apellido) ? visita.Apellido : "" ) + "</td>";
                content = content + $"<td style='font-size: 9px;'>" + (!string.IsNullOrEmpty(visita.Mail) ? visita.Mail : "") + "</td>";
                content = content + $"<td style='font-size: 9px;'>" + (!string.IsNullOrEmpty(visita.Telefono) ? visita.Telefono : "") + "</td>";
                content = content + $"<td style='font-size: 9px;'>" + (!string.IsNullOrEmpty(visita.Rut) ? visita.Rut : "") + "</td>";
                content = content + $"<td style='font-size: 9px; text-align: center;' > {visita.FechaVisita.ToString("dd / MM / yyyy")} </td>";
                content = content + $"<td style='font-size: 9px; text-align: center;' > {visita.DuracionVisita} </td>";
                content = content + $"<td style='font-size: 9px;' class='cell-{visita.EvaluacionVendedor}'>";
                content = content + (visita.EvaluacionVendedor != 0 ? visita.EvaluacionVendedor.ToString() : "" ) +  "</td>";
                content = content + $"<td style='font-size: 9px;' class='cell-{visita.Equipamiento}'>" + (visita.Equipamiento != 0 ? visita.Equipamiento.ToString() : "") + "</td>";
                content = content + $"<td style='font-size: 9px;' class='cell-{visita.Terminaciones}'>" + (visita.Terminaciones != 0 ? visita.Terminaciones.ToString() : "") + "</td>";
                content = content + $"<td style='font-size: 9px;' class='cell-{visita.Conectividad}'>" + (visita.Conectividad != 0 ? visita.Conectividad.ToString() : "") + "</td>";
                content = content + $"<td style='font-size: 9px;' class='cell-{visita.Rentabilidad}'>" + (visita.Rentabilidad != 0 ? visita.Rentabilidad.ToString() : "") + "</td></tr>";
            }

            return content;
        }
}
}