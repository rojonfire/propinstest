using Corretaje.Repository;
using Corretaje.Service.IServices.ISuscripcion;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Corretaje.Common.Excel;
using System.IO;
using Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPIInmobiliaria;
using Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPINatural;
using MongoDB.Driver;
using Corretaje.Domain;
using System;
using MongoDB.Bson;
using Corretaje.Service.IServices.IPropiedad;
using Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPIArriendo;

namespace Corretaje.Service.Services.Suscripcion
{
    public class SuscripcionService : ISuscripcionService
    {
        private readonly IRepository<Domain.Suscripcion> _suscripcionRepository;
        private readonly ISuscripcionQueryFiltro _suscripcionQueryFiltro;
        private readonly IExcelToObjectList _excelToObjectList;
        private readonly IPIPropiedadInmobiliariaService _propiedadInmobiliariaService;
        private readonly IPIPropiedadNaturalService _propiedadNaturalService;
        private readonly IPIPropiedadArriendoService _propiedadArriendoService;
        private readonly IPropiedadService _propiedadService;
        private readonly ISuscripcionConfiguracion _suscripcionConfiguracion;
        private readonly ISuscripcionSendEMail _suscripcionSendEmail;

        public SuscripcionService(IRepository<Domain.Suscripcion> suscripcionRepository, ISuscripcionQueryFiltro suscripcionQueryFiltro, IExcelToObjectList excelToObjectList,
            IPIPropiedadInmobiliariaService propiedadInmobiliariaService, IPIPropiedadNaturalService propiedadNaturalService,
            IPIPropiedadArriendoService propiedadArriendoService, IPropiedadService propiedadService, ISuscripcionConfiguracion suscripcionConfiguracion, 
            ISuscripcionSendEMail suscripcionSendEmail)
        {
            _suscripcionRepository = suscripcionRepository;
            _suscripcionQueryFiltro = suscripcionQueryFiltro;
            _excelToObjectList = excelToObjectList;
            _propiedadInmobiliariaService = propiedadInmobiliariaService;
            _propiedadNaturalService = propiedadNaturalService;
            _propiedadArriendoService = propiedadArriendoService;
            _propiedadService = propiedadService;
            _suscripcionConfiguracion = suscripcionConfiguracion;
            _suscripcionSendEmail = suscripcionSendEmail;
        }

        public async Task<Domain.Suscripcion> Add(Domain.Suscripcion suscripcion)
        {
            return await _suscripcionRepository.Insert(suscripcion);
        }
        
        public async Task<IEnumerable<Domain.Suscripcion>> GetAll()
        {
            return await _suscripcionRepository.GetAll();
        }

        public async Task<Domain.Suscripcion> Get(ObjectId id)
        {
            return await _suscripcionRepository.Get(id);
        }

        public async Task<Page<Domain.Suscripcion>> GetAllPaginated(int pageSize, int page)
        {
            FilterDefinition<Domain.Suscripcion> filter = _suscripcionQueryFiltro.FindAll();
            var sort = _suscripcionQueryFiltro.SortByFechaCreacionDescending();

            var allSuscripcionesFiltered = await _suscripcionRepository.SearchFor(filter);
            int totalSuscripciones = allSuscripcionesFiltered.Count();

            var propiedades = await _suscripcionRepository.Pagination(filter, page, pageSize, sort);

            Page<Domain.Suscripcion> paginated = new Page<Domain.Suscripcion>();
            paginated.CurrentPage = page;
            paginated.Results = propiedades;
            paginated.TotalResults = totalSuscripciones;
            Double totalPagesRatio = Double.Parse(totalSuscripciones.ToString()) / Double.Parse(pageSize.ToString());
            paginated.TotalPages = int.Parse(Math.Ceiling(totalPagesRatio).ToString());

            return paginated;
        }

        public async Task<Domain.Suscripcion> Update(Domain.Suscripcion suscripcion)
        {
            return await _suscripcionRepository.Update(suscripcion);
        }

        public async Task<IEnumerable<Domain.Suscripcion>> UpdateRecomendaciones()
        {
            var suscripciones = await _suscripcionRepository.GetAll();
            List<Domain.Suscripcion> suscripcionesActualizadas = new List<Domain.Suscripcion>();

            foreach (var sus in suscripciones)
            {
                var propiedades = new List<Domain.PropiedadesPI.PIPropiedad>();

                if (sus.EsVenta)
                {
                    var propiedadesInmobiliarias = await _propiedadInmobiliariaService.BuscarCoincidencias(sus);
                    foreach (var i in propiedadesInmobiliarias)
                    {
                        var j = new Domain.PropiedadesPI.PIPropiedad(i.Comuna, i.Barrio, i.Precio, i.SuperficieTotal, i.SuperficieUtil,
                            i.Dormitorios, i.Banios, i.TipoPropiedad, i.Link, i.UF_m2, i.Estacionamientos);
                        propiedades.Add(j);
                    }

                    var propiedadesNaturales = await _propiedadNaturalService.BuscarCoincidencias(sus);
                    foreach (var n in propiedadesNaturales)
                    {
                        var k = new Domain.PropiedadesPI.PIPropiedad(n.Comuna, n.Barrio, n.Precio, n.SuperficieTotal, n.SuperficieUtil,
                            n.Dormitorios, n.Banios, n.TipoPropiedad, n.Link, n.UF_m2, n.Estacionamientos);
                        propiedades.Add(k);
                    }

                    var propiedadesPropins = await _propiedadService.BuscarCoincidencias(sus, _suscripcionConfiguracion.FactorSuperficieInferior,
                    _suscripcionConfiguracion.FactorSuperficieSuperior, _suscripcionConfiguracion.SumaEstacionamientos, Estados.EstadoPropiedad.PropiedadPublicada);
                    foreach (var m in propiedadesPropins)
                    {
                        string link = $"{_suscripcionConfiguracion.BaseUrl}info-propiedad?idprop={m.Id}";
                        if (m.TipoPrecio == "UF")
                        {

                        }
                        else
                        {

                        }
                        var l = new Domain.PropiedadesPI.PIPropiedad(m.Comuna, m.Barrio, Convert.ToInt32(m.Valor), Convert.ToInt32(m.SuperficieTotales),
                            Convert.ToInt32(m.SuperficieUtil), m.Dormitorios, m.Banio, m.TipoPropiedad, link, 0, m.CantEstacionamiento);
                        propiedades.Add(l);
                    }
                } else
                {
                    var propiedadesArriendo = await _propiedadArriendoService.BuscarCoincidencias(sus);
                    foreach (var u in propiedadesArriendo)
                    {
                        var v = new Domain.PropiedadesPI.PIPropiedad(u.Comuna, u.Barrio, u.Precio, u.SuperficieTotal, u.SuperficieUtil,
                            u.Dormitorios, u.Banios, u.TipoPropiedad, u.Link, u.UF_m2, u.Estacionamientos);
                        propiedades.Add(v);
                    }
                }

                sus.RecomendacionesUno = propiedades.Where(p => p.Comuna == sus.ComunaUno).Select(k => k.Link).ToList();
                sus.RecomendacionesDos = propiedades.Where(p => p.Comuna == sus.ComunaDos).Select(k => k.Link).ToList();
                sus.RecomendacionesTres = propiedades.Where(p => p.Comuna == sus.ComunaTres).Select(k => k.Link).ToList();

                suscripcionesActualizadas.Add(await Update(sus));
            }

            _suscripcionSendEmail.SendEmailSuscripcionesActualizadas();

            return suscripcionesActualizadas;
        }

        public async Task<MemoryStream> Export(string filePath)
        {
            //var result = await _suscripcionRepository.SearchFor(_suscripcionQueryFiltro.FindByTieneRecomendaciones());
            var result = await _suscripcionRepository.GetAll();
            var newResult = result.Select(p => new SuscripcionExportar
            {
                Nombre = p.NombreUsuario,
                Email = p.EmailUsuario,
                Telefono = p.Telefono,
                Tipo = p.EsVenta ? "Venta" : "Arriendo",
                ComunaUno = p.ComunaUno,
                ComunaDos = p.ComunaDos,
                ComunaTres = p.ComunaTres,
                TipoPropiedad = p.TipoPropiedad,
                CantidadDormitoriosDesde = p.CantidadDormitoriosDesde,
                CantidadDormitoriosHasta = p.CantidadDormitoriosHasta,
                CantidadBanosDesde = p.CantidadBanosDesde,
                CantidadBanosHasta = p.CantidadBanosHasta,
                CantidadEstacionamientos = p.CantidadEstacionamientos,
                ValorDesde = p.ValorDesde,
                ValorHasta = p.ValorHasta,
                MetrosTotalesDesde = p.MetrosTotalesDesde,
                MetrosTotalesHasta = p.MetrosTotalesHasta,
                MetrosUtilesDesde = p.MetrosUtilesDesde,
                MetrosUtilesHasta = p.MetrosUtilesHasta,
                Puntaje = p.Puntaje,
                RecomendacionesUno = string.Join(", ", p.RecomendacionesUno),
                RecomendacionesDos = string.Join(", ", p.RecomendacionesDos),
                RecomendacionesTres = string.Join(", ", p.RecomendacionesTres),
            });
            return _excelToObjectList.ExportToXLSX<SuscripcionExportar>(newResult, filePath);
        }

        public async Task<Domain.Suscripcion> GetLastUpdated()
        {
            var result = await _suscripcionRepository.GetAll();
            return result.OrderByDescending(p => p.UpdatedAt).FirstOrDefault();
        }
    }
}
