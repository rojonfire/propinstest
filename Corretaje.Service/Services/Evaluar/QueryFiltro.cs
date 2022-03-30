using Corretaje.Domain.Evaluar;
using Corretaje.Service.IServices.IEvaluar;
using MongoDB.Bson;
using MongoDB.Driver;
using System;

namespace Corretaje.Service.Services
{
    public class QueryFiltro : IQueryFiltro
    {
        public FilterDefinition<EvaluarProyectoInmobiliario> FiltroEvaluarProyectoByInmobiliariaId(ObjectId proyectoInmobiliarioId)
        {

            var filter = Builders<EvaluarProyectoInmobiliario>.Filter.Where(evaluar => evaluar.Id != null);

            if (!String.IsNullOrEmpty(proyectoInmobiliarioId.ToString()))
            {
                filter = filter & (Builders<EvaluarProyectoInmobiliario>.Filter.Where(evaluar => evaluar.ProyectoInmobiliarioId == proyectoInmobiliarioId));
            }
            return filter;
        }
    }
}
