using Corretaje.Domain.Evaluar;
using Corretaje.Service.IServices.IReporte;
using MongoDB.Bson;
using MongoDB.Driver;
using System;

namespace Corretaje.Service.Services.Reporte
{
    public class ReporteQueryFiltro : IReporteQueryFiltro
    {
        public FilterDefinition<Domain.Reporte> FiltroReporteByInmobiliariaId(Domain.ReporteQueryString query)
        {
            var filter = Builders<Domain.Reporte>.Filter.Where(reporte => reporte.Id != null);

            if (!String.IsNullOrEmpty(query.InmobiliariaId))
            {
                filter = filter & (Builders<Domain.Reporte>.Filter.Where(reporte => reporte.InmobiliariaId == query.InmobiliariaId));
            }
            return filter;
        }

        public FilterDefinition<Domain.ProyectoInmobiliario> FiltroProyectoInmobiliarioByInmobiliariaId(string inmobiliariaId)
        {

            var filter = Builders<Domain.ProyectoInmobiliario>.Filter.Where(proyecto => proyecto.Id != null);

            if (!String.IsNullOrEmpty(inmobiliariaId))
            {
                filter = filter & (Builders<Domain.ProyectoInmobiliario>.Filter.Where(proyecto => proyecto.InmobiliariaId == inmobiliariaId));
            }

            return filter;
        }

        public FilterDefinition<EvaluarAnfitrion> FiltroEvaluacionVendedorByUsuarioId(ObjectId usuarioId)
        {

            var filter = Builders<EvaluarAnfitrion>.Filter.Where(evaluacion => evaluacion.Id != null);

            if (!String.IsNullOrEmpty(usuarioId.ToString()))
            {
                filter = filter & (Builders<EvaluarAnfitrion>.Filter.Where(evaluacion => evaluacion.EvaluadorId == usuarioId));
            }

            return filter;
        }
    }
}
