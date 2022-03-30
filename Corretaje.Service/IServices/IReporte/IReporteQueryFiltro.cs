using Corretaje.Domain;
using Corretaje.Domain.Evaluar;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IReporte
{
    public interface IReporteQueryFiltro
    {
        FilterDefinition<Reporte> FiltroReporteByInmobiliariaId(ReporteQueryString query);

        FilterDefinition<Domain.ProyectoInmobiliario> FiltroProyectoInmobiliarioByInmobiliariaId(string inmobiliariaId);

        FilterDefinition<EvaluarAnfitrion> FiltroEvaluacionVendedorByUsuarioId(ObjectId usuarioId);
    }
}
