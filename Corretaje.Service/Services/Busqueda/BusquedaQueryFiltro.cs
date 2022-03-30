using Corretaje.Service.IServices.IBusqueda;
using MongoDB.Driver;
using System;

namespace Corretaje.Service.Services.Busqueda
{
    public class BusquedaQueryFiltro : IBusquedaQueryFiltro
    {
        public FilterDefinition<Domain.Busqueda> FindBusquedasByFechaMayorA(DateTime fecha)
        {
            return Builders<Domain.Busqueda>.Filter.Where(busqueda => busqueda.CreatedAt >= fecha);
        }
    }
}
