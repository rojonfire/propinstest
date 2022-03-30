using Corretaje.Domain.PropiedadesPI;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPIInmobiliaria
{
    public interface IPIPropiedadInmobiliariaQueryFiltro
    {
        FilterDefinition<PIPropiedadInmobiliaria> Filtrar(Domain.Suscripcion suscripcion);

        SortDefinition<PIPropiedadInmobiliaria> SortByFechaCreacion();
    }
}
