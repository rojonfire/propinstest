using Corretaje.Domain;
using MongoDB.Driver;
using System;

namespace Corretaje.Service.IServices.IOrdenCompra
{
    public interface IOrdenCompraQueryFiltro
    {
        FilterDefinition<OrdenDeCompra> FindOrdenCompraByUsuarioId(string usuarioId);

        FilterDefinition<OrdenDeCompra> FindOrdenCompraLogin(string usuarioId);

        FilterDefinition<OrdenDeCompra> FindOrdenesCompraByFechaEmisionUsuarioId(DateTime fechaEmision, string usuarioId);

        FilterDefinition<OrdenDeCompra> FindOrdenesCompraByFechaEmisionEstadoTransaccionUsuarioId(DateTime fechaEmision, Estados.Transaccion estadoTransaccion, string usuarioId);

        FilterDefinition<OrdenDeCompra> FindConAnfrion();

        FindOptions<OrdenDeCompra, OrdenDeCompra> OrderByUltimaOrdenCompra();
    }
}
