using MongoDB.Driver;

namespace Corretaje.Service.IServices.IPropiedadesPI
{
    public interface IPIPropiedadQueryFiltro<T>
    {
        FilterDefinition<T> Filtrar(Domain.Suscripcion suscripcion, double factorSuperficieInferior, double factorSuperficieSuperior, int sumaEstacionamientos);

        SortDefinition<T> SortByFechaCreacion();
    }
}
