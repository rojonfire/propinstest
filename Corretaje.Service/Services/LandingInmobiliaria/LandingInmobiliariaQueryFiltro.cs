using Corretaje.Service.IServices.ILandingInmobiliaria;
using MongoDB.Driver;

namespace Corretaje.Service.Services.LandingInmobiliaria
{
    public class LandingInmobiliariaQueryFiltro : ILandingInmobiliariaQueryFiltro
    {
        public FilterDefinition<Domain.LandingInmobiliaria> FindAll()
        {
            return Builders<Domain.LandingInmobiliaria>.Filter.Where(s => s.Id != null);
        }

        public FilterDefinition<Domain.LandingInmobiliaria> FindByPathname(string pathname)
        {
            return Builders<Domain.LandingInmobiliaria>.Filter.Where(s => s.Pathname == pathname);
        }

        public SortDefinition<Domain.LandingInmobiliaria> SortByFechaCreacionDescending()
        {
            return Builders<Domain.LandingInmobiliaria>.Sort.Descending(s => s.CreatedAt);
        }
    }
}
