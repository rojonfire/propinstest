using Corretaje.Domain;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.ITarjetaProp
{
    public interface ITarjetaPropQueryFiltro
    {
        FilterDefinition<TarjetaProp> FindByBusquedaUsuario(Busqueda parametrosBusqueda);
        SortDefinition<TarjetaProp> SortbyPrecio(bool desc);
        FilterDefinition<TarjetaProp> FindByCodPRopiedad(string codPropiedad);
    }
}