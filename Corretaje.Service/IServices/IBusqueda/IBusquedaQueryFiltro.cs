using Corretaje.Domain;
using MongoDB.Driver;
using System;

namespace Corretaje.Service.IServices.IBusqueda
{
    public interface IBusquedaQueryFiltro
    {
        FilterDefinition<Busqueda> FindBusquedasByFechaMayorA(DateTime fecha);
    }
}
