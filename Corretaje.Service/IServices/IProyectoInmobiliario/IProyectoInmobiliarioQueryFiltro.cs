using Corretaje.Domain;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IProyectoInmobiliario
{
    public interface IProyectoInmobiliarioQueryFiltro
    {
        FilterDefinition<ProyectoInmobiliario> FiltroProyectoInmobiliarioByInmobiliariaId(ProyectoInmobiliarioQueryString query);
    }
}
