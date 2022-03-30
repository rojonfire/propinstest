using Corretaje.Service.IServices.ISuscripcion;
using MongoDB.Driver;

namespace Corretaje.Service.Services.Suscripcion
{
    public class SuscripcionQueryFiltro : ISuscripcionQueryFiltro
    {
        public FilterDefinition<Domain.Suscripcion> FindAll()
        {
            return Builders<Domain.Suscripcion>.Filter.Where(s => s.Id != null);
        }

        public FilterDefinition<Domain.Suscripcion> FindByTieneRecomendaciones()
        {
            return Builders<Domain.Suscripcion>.Filter.Where(s => s.RecomendacionesUno.Count > 0 || s.RecomendacionesDos.Count > 0 || s.RecomendacionesTres.Count > 0);
        }

        public SortDefinition<Domain.Suscripcion> SortByFechaCreacionDescending()
        {
            return Builders<Domain.Suscripcion>.Sort.Descending(s => s.CreatedAt);
        }
    }
}
