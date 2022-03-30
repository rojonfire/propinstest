using MongoDB.Driver;

namespace Corretaje.Service.IServices.ISuscripcion
{
    public interface ISuscripcionQueryFiltro
    {
        FilterDefinition<Domain.Suscripcion> FindAll();

        FilterDefinition<Domain.Suscripcion> FindByTieneRecomendaciones();

        SortDefinition<Domain.Suscripcion> SortByFechaCreacionDescending();
    }
}
