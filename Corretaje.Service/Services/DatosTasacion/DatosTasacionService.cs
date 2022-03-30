using Corretaje.Common.Excel;
using Corretaje.Domain.Tasacion;
using Corretaje.Repository;
using Corretaje.Service.IServices.IDatosTasacion;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using MongoDB.Driver;
using Corretaje.Domain;
using System;

namespace Corretaje.Service.Services.DatosTasacion
{
    public class DatosTasacionService<T> : IDatosTasacionService<T> where T : Domain.Tasacion.DatosTasacion
    {
        private readonly IRepository<T> _datosTasacionRespository;
        private readonly IDatosTasacionQueryFiltro<T> _datosTasacionQueryFiltro;
        private readonly IDatosTasacionConfiguracion _datosTasacionConfiguracion;

        public DatosTasacionService(IRepository<T> datosTasacionRepository,
            IDatosTasacionQueryFiltro<T> datosTasacionQueryFiltro, IDatosTasacionConfiguracion datosTasacionConfiguracion
            )
        {
            _datosTasacionRespository = datosTasacionRepository;
            _datosTasacionQueryFiltro = datosTasacionQueryFiltro;
            _datosTasacionConfiguracion = datosTasacionConfiguracion;
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _datosTasacionRespository.GetAll();
        }

        public async Task<IEnumerable<T>> FiltrarTasacion(TasacionPropiedad datosTasacion)
        {
            return await _datosTasacionRespository.SearchFor(_datosTasacionQueryFiltro.FiltrarParaTasacion(
                datosTasacion,
                _datosTasacionConfiguracion.FactorRangoInferiorSuperficieUtil,
                _datosTasacionConfiguracion.FactorRangoSuperiorSuperficieUtil, 
                _datosTasacionConfiguracion.FactorRangoInferiorSuperficieTotal,
                _datosTasacionConfiguracion.FactorRangoSuperiorSuperficieTotal
                ));
        }

        public async Task<ValoresPreliminaresTasacion> ObtenerValoresPreliminares(TasacionPropiedad datosTasacion)
        {
            var result = await FiltrarTasacion(datosTasacion);
            int minDormitorios = result.Min(p => p.Dormitorios);
            int maxDormitorios = result.Max(p => p.Dormitorios);
            int minMetrosTotales = result.Min(p => p.SuperficieTotal);
            int maxMetrosTotales = result.Max(p => p.SuperficieTotal);

            return new ValoresPreliminaresTasacion
            {
                maxDormitorios = maxDormitorios,
                minDormitorios = minDormitorios,
                minMetrosTotales = minMetrosTotales,
                maxMetrosTotales = maxMetrosTotales
            };
        }

        public async Task<Page<T>> GetPropiedadesSimilares(TasacionPropiedad datosTasacion, int pageSize, int page)
        {
            var filter = _datosTasacionQueryFiltro.FiltrarParaTasacion(
                datosTasacion,
                _datosTasacionConfiguracion.FactorRangoInferiorSuperficieUtil,
                _datosTasacionConfiguracion.FactorRangoSuperiorSuperficieUtil,
                _datosTasacionConfiguracion.FactorRangoInferiorSuperficieTotal, 
                _datosTasacionConfiguracion.FactorRangoSuperiorSuperficieTotal
                );

            var allPropiedadesSimilares = await _datosTasacionRespository.SearchFor(filter);
            int totalPropiedadesSimilares = allPropiedadesSimilares.Count();

            var sort = _datosTasacionQueryFiltro.SortByFechaCreacion();

            var propiedadesSimilaresPaginadas = await _datosTasacionRespository.Pagination(filter, page, pageSize, sort);

            Page<T> paginated = new Page<T>();
            paginated.CurrentPage = page;
            paginated.Results = propiedadesSimilaresPaginadas;
            paginated.TotalResults = totalPropiedadesSimilares;
            Double totalPagesRatio = Double.Parse(totalPropiedadesSimilares.ToString()) / Double.Parse(pageSize.ToString());
            paginated.TotalPages = int.Parse(Math.Ceiling(totalPagesRatio).ToString());

            return paginated;
        }

        public async Task<IEnumerable<T>> GetPropiedadesSimilares(TasacionPropiedad datosTasacion)
        {
            var filter = _datosTasacionQueryFiltro.FiltrarParaTasacion(
                datosTasacion,
                _datosTasacionConfiguracion.FactorRangoInferiorSuperficieUtil,
                _datosTasacionConfiguracion.FactorRangoSuperiorSuperficieUtil, 
                _datosTasacionConfiguracion.FactorRangoInferiorSuperficieTotal, 
                _datosTasacionConfiguracion.FactorRangoSuperiorSuperficieTotal
                );

            var allPropiedadesSimilares = await _datosTasacionRespository.SearchFor(filter);

            return allPropiedadesSimilares;
        }

        public async Task<T> Add(T datosTasacion)
        {
            return await _datosTasacionRespository.Insert(datosTasacion);
        }
        /*
        public async Task<IEnumerable<T>> UploadFile(string fileLocation)
        {
            var list = _excelToObject.ReadExcelFileToObjectList<T>(fileLocation);
            return await AddMany(list);
        }
        */

        public async Task<IEnumerable<T>> AddMany(IEnumerable<T> datosTasacionList)
        {
            List<T> datosTasacionAgregados = new List<T>();

            foreach(var datosTasacion in datosTasacionList)
            {
                datosTasacionAgregados.Add(await Add(datosTasacion));
            }

            return datosTasacionAgregados;
        }


        public async void DeleteAll()
        {
            var allDatosTasacion = await _datosTasacionRespository.GetAll();
            foreach (var dt in allDatosTasacion)
            {
                Delete(dt.Id);
            }
        }

        public async void Delete(ObjectId objectId)
        {
            await _datosTasacionRespository.Delete(objectId);
        }

    }
}
