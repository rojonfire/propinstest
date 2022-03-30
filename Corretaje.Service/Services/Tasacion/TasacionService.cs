using Corretaje.Common.Excel;
using Corretaje.Domain.Tasacion;
using Corretaje.Repository;
using Corretaje.Service.IServices.ITasacion;
using MongoDB.Bson;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Linq;
using System;
using Corretaje.Domain;

namespace Corretaje.Service.Services.Tasacion
{
    public class TasacionService : ITasacionService
    {
        private readonly IRepository<Domain.Tasacion.TasacionResult> _tasacionRespository;
        private readonly ITasacionQueryFiltro _tasacionQuery;
        private const int uno = 1;
        private readonly ITasacionConfiguracion _tasacionConfiguracion;

        public TasacionService(IRepository<Domain.Tasacion.TasacionResult> tasacionRepository,ITasacionQueryFiltro tasacionQuery, ITasacionConfiguracion tasacionConfiguracion)
        {
            _tasacionRespository = tasacionRepository;
            _tasacionQuery = tasacionQuery;
            _tasacionConfiguracion = tasacionConfiguracion;
        }

        public async Task<Domain.Tasacion.TasacionResult> Add(Domain.Tasacion.TasacionResult tasacion)
        {
            return await _tasacionRespository.Insert(tasacion);
        }

        public async Task<Domain.Tasacion.TasacionResult> Get(ObjectId id)
        {
            return await _tasacionRespository.Get(id);
        }

        public async Task<Domain.Tasacion.TasacionResult> Update(Domain.Tasacion.TasacionResult tasacion)
        {
            return await _tasacionRespository.Update(tasacion);
        }

        public async Task<IEnumerable<Domain.Tasacion.TasacionResult>> GetAll()
        {
            return await _tasacionRespository.GetAll();
        }

        public async Task<Domain.Tasacion.TasacionResult> GetByPropiedadId(string IdPropiedad)
        {
            var filtered = await _tasacionRespository.SearchFor(_tasacionQuery.FindByPropiedadId(IdPropiedad));
            return filtered.FirstOrDefault();
        }
        /*

        public async Task<IEnumerable<Domain.Tasacion.TasacionResult>> GetForQuery(string idUser)
        {
            return await _tasacionRespository.SearchFor(_tasacionQuery.GetTasacionesByUsuarioId(idUser));
        }
        

        public async Task<int> GenerarNumeroSolicitud()
        {
            var ultimaSolicitud = await _tasacionRespository.FindFirstByOptions(_tasacionQuery.FiltroVacio(), _tasacionQuery.FindByUltimoNumeroSolicitud());

            if (ultimaSolicitud == null) return 1;

            return ultimaSolicitud.NumeroSolicitud + 1;
        }
        */
        public async void Delete(ObjectId id)
        {
            await _tasacionRespository.Delete(id);
        }

        public async Task<TasacionResult> GetTasacionPropiedad(IEnumerable<Domain.Tasacion.DatosTasacion> datosTasacion, TasacionPropiedad tasacionPropiedad)
        {
            TasacionResult tasacionResult = new TasacionResult();
            double valorPromedio = datosTasacion.Average(p => p.Precio);

            tasacionResult.Estado = Estados.RequestStatus.Success;
            tasacionResult.ValorMedio = int.Parse(Math.Round(valorPromedio * _tasacionConfiguracion.FactorValorMedia).ToString());
            tasacionResult.ValorMinimo = int.Parse(Math.Round(valorPromedio * _tasacionConfiguracion.FactorValorMedia * _tasacionConfiguracion.FactorValorMinimo).ToString());
            tasacionResult.ValorMaximo = int.Parse(Math.Round(valorPromedio * _tasacionConfiguracion.FactorValorMedia * _tasacionConfiguracion.FactorValorMaximo).ToString());
            tasacionResult.ValorFast = int.Parse(Math.Round(valorPromedio * _tasacionConfiguracion.FactorValorMedia * _tasacionConfiguracion.FactorValorFast).ToString());
            tasacionResult.ValorFastMinimo = int.Parse(Math.Round(valorPromedio * _tasacionConfiguracion.FactorValorMedia * _tasacionConfiguracion.FactorValorMinimoFast).ToString());

            return tasacionResult;
        }

    }
}
