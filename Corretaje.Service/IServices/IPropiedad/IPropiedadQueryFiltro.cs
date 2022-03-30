using Corretaje.Domain;
using MongoDB.Driver;
using System;
using System.Linq;
using static Corretaje.Domain.Estados;

namespace Corretaje.Service.IServices.IPropiedad
{
    public interface IPropiedadQueryFiltro
    {
        FilterDefinition<Propiedad> FindByBusquedaUsuario(Busqueda parametrosBusqueda);

        FilterDefinition<Propiedad> Filtrar(Domain.Suscripcion suscripcion, double factorSuperficieInferior, double factorSuperficieSuperior, int sumaEstacionamientos, EstadoPropiedad estadoPropiedad);

        FilterDefinition<Propiedad> FindPropiedadPorExpirar(DateTime fechaExpiracion);

        FilterDefinition<Propiedad> FindByTipoOperacionTipoPropiedad(IGrouping<string, Busqueda> busquedasPorUsuario);

        SortDefinition<Propiedad> SortByPrecio(bool desc);

        SortDefinition<Propiedad> SortByFechaCreacion();

        FilterDefinition<Propiedad> FindAll();

        FilterDefinition<Propiedad> FindByClienteId(string ClienteId);

        FilterDefinition<Propiedad> FindPropiedadesByEstado(EstadoPropiedad estadoPropiedad);

        FilterDefinition<Propiedad> FindPropiedadesByIdBroker(string idBroker);

        FilterDefinition<Propiedad> FindPropiedadesByTieneContrato();
    }
}
