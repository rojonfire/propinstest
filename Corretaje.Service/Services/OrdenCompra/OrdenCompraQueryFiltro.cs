using Corretaje.Domain;
using Corretaje.Service.IServices.IOrdenCompra;
using MongoDB.Driver;
using System;
using System.Linq;

namespace Corretaje.Service.Services.OrdenCompra
{
    public class OrdenCompraQueryFiltro : IOrdenCompraQueryFiltro
    {
        public FilterDefinition<OrdenDeCompra> FindConAnfrion()
        {
            return Builders<OrdenDeCompra>.Filter.Where(ordenCompra => ordenCompra.Estado == Estados.Transaccion.Exitosa && ordenCompra.ServiciosAdicionales.Any(servicioAdicional => servicioAdicional.Nombre == "Anfitriones"));
        }

        public FilterDefinition<OrdenDeCompra> FindOrdenCompraLogin(string usuarioId)
        {
            return Builders<OrdenDeCompra>.Filter.Where(ordenCompra => ordenCompra.Estado == Estados.Transaccion.Exitosa && ordenCompra.UsuarioId == usuarioId);
        }

        public FilterDefinition<OrdenDeCompra> FindOrdenesCompraByFechaEmisionEstadoTransaccionUsuarioId(DateTime fechaEmision, Estados.Transaccion estadoTransaccion, string usuarioId)
        {
            return Builders<OrdenDeCompra>.Filter.Where(ordenCompra => ordenCompra.FechaEmision >= fechaEmision && ordenCompra.Estado == estadoTransaccion && ordenCompra.UsuarioId == usuarioId);
        }

        public FilterDefinition<OrdenDeCompra> FindOrdenesCompraByFechaEmisionUsuarioId(DateTime fechaEmision, string usuarioId)
        {
            return Builders<OrdenDeCompra>.Filter.Where(ordenCompra => ordenCompra.FechaEmision >= fechaEmision && ordenCompra.UsuarioId == usuarioId);
        }

        public FilterDefinition<OrdenDeCompra> FindOrdenCompraByUsuarioId(string usuarioId)
        {
            return Builders<OrdenDeCompra>.Filter.Where(ordenCompra => ordenCompra.UsuarioId == usuarioId && ordenCompra.NotaCredito == null);
        }

        public FindOptions<OrdenDeCompra, OrdenDeCompra> OrderByUltimaOrdenCompra()
        {
            return new FindOptions<OrdenDeCompra, OrdenDeCompra>
            {
                Limit = 1,
                Sort = Builders<OrdenDeCompra>.Sort.Descending(o => o.CreatedAt)
            };
        }
    }
}
