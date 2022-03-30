using MongoDB.Driver;

namespace Corretaje.Service.IServices.ILandingInmobiliaria
{
    public interface ILandingInmobiliariaQueryFiltro
    {
        FilterDefinition<Domain.LandingInmobiliaria> FindAll();

        FilterDefinition<Domain.LandingInmobiliaria> FindByPathname(string pathname);

        SortDefinition<Domain.LandingInmobiliaria> SortByFechaCreacionDescending();
    }
}
