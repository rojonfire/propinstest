using Corretaje.Domain;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IOrdenCompra
{
    public interface IOrdenCompraService
    {
        OrdenDeCompra ClonarOrdenCompra(OrdenDeCompra ordenCompra);

        Task<IEnumerable<OrdenDeCompra>> GetOrdenesCompraByFechaEmisionUsuarioId(DateTime fechaEmision, string usuarioId);

        Task<IEnumerable<OrdenDeCompra>> GetOrdenesCompraByFechaEmisionEstadoTransaccionUsuarioId(DateTime fechaEmision, Estados.Transaccion estadoTransaccion, string usuarioId);

        Task<IEnumerable<OrdenDeCompra>> GetOrdenesDeCompraByUsuarioId(string usuarioId);

        Task<IEnumerable<OrdenDeCompra>> GetOrdenesCompraLogin(string usuarioId);

        Task<IEnumerable<OrdenDeCompra>> GetOrdenesCompraConServicioAnfitrion();

        Task<OrdenDeCompra> AnularOrdenCompra(ObjectId ordenDecompraId);

        Task<OrdenDeCompra> AnularOrdenCompra(OrdenDeCompra ordenCompra);

        Task<OrdenDeCompra> GetOrdenDeCompraById(ObjectId ordenDecompraId);

        Task<OrdenDeCompra> GetOrdenDeCompraLogin(string usuarioId);

        Task<OrdenDeCompra> GuardarOrdenDeCompra(OrdenDeCompra ordenDeCompra);

        Task<OrdenDeCompra> Update(OrdenDeCompra orden);

        void SendEmail(OrdenDeCompra ordenCompra, string html, IEnumerable<string> attachmentsPath);

        void SetServiciosAdicionalesExcluidosCalculoPrecioOrdenCompra(IEnumerable<ServicioAdicional> serviciosAdicionales);
    }
}
