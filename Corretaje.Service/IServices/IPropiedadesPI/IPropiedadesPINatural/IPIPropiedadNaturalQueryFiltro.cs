using Corretaje.Domain.PropiedadesPI;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPINatural
{
    public interface IPIPropiedadNaturalQueryFiltro
    {
        FilterDefinition<PIPropiedadNatural> Filtrar(Domain.Suscripcion suscripcion);

        SortDefinition<PIPropiedadNatural> SortByFechaCreacion();
    }
}
