using Corretaje.Domain.PropiedadesPI;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPIArriendo
{
    public interface IPIPropiedadArriendoQueryFiltro
    {
        FilterDefinition<PIPropiedadArriendo> Filtrar(Domain.Suscripcion suscripcion);

        SortDefinition<PIPropiedadArriendo> SortByFechaCreacion();
    }
}