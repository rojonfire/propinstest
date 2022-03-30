using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices.INotaCredito;
using Corretaje.Service.IServices.IOrdenCompra;
using Corretaje.Service.IServices.IServicio;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.OrdenCompra
{
    public class OrdenCompraService : IOrdenCompraService
    {
        private readonly ICalculoPrecioServicioAdicional _calculoPrecioServicioAdicional;
        private readonly INotaCreditoService _notaCreditoService;
        private readonly IOrdenCompraCliente _ordenCompraCliente;
        private readonly IOrdenCompraEstado _ordenCompraEstado;
        private readonly IOrdenCompraQueryFiltro _ordenCompraQueryFiltro;
        private readonly IOrdenCompraSendEmail _ordenCompraSendEmail;
        private readonly IRepository<OrdenDeCompra> _ordenCompraRepository;

        public OrdenCompraService(ICalculoPrecioServicioAdicional calculoPrecioServicioAdicional, INotaCreditoService notaCreditoService, IOrdenCompraCliente ordenCompraCliente, IOrdenCompraEstado ordenCompraEstado, IOrdenCompraQueryFiltro ordenCompraQueryFiltro, IOrdenCompraSendEmail ordenCompraSendEmail, IRepository<OrdenDeCompra> ordenCompraRepository)
        {
            _calculoPrecioServicioAdicional = calculoPrecioServicioAdicional;
            _notaCreditoService = notaCreditoService;
            _ordenCompraCliente = ordenCompraCliente;
            _ordenCompraEstado = ordenCompraEstado;
            _ordenCompraQueryFiltro = ordenCompraQueryFiltro;
            _ordenCompraRepository = ordenCompraRepository;
            _ordenCompraSendEmail = ordenCompraSendEmail;
        }

        public async Task<OrdenDeCompra> GetOrdenDeCompraById(ObjectId ordenDecompraId)
        {
            return await _ordenCompraRepository.Get(ordenDecompraId);
        }

        public async Task<OrdenDeCompra> AnularOrdenCompra(ObjectId ordenDecompraId)
        {
            var ordenCompra = await _ordenCompraRepository.Get(ordenDecompraId);

            return await AnularOrdenCompra(ordenCompra);
        }

        public async Task<OrdenDeCompra> AnularOrdenCompra(OrdenDeCompra ordenCompra)
        {
            var notaCredito = await _notaCreditoService.GenerarNotaCredito(ordenCompra.TotalEnPesoChileno, ordenCompra.Id.ToString());

            ordenCompra.NotaCredito = notaCredito;

            _ordenCompraEstado.SetAnulada(ordenCompra);

            return await Update(ordenCompra);
        }

        public async Task<IEnumerable<OrdenDeCompra>> GetOrdenesDeCompraByUsuarioId(string usuarioId)
        {
            return await _ordenCompraRepository.SearchFor(_ordenCompraQueryFiltro.FindOrdenCompraByUsuarioId(usuarioId));
        }

        public async Task<OrdenDeCompra> GuardarOrdenDeCompra(OrdenDeCompra ordenDeCompra)
        {
            SetFechaEmision(ordenDeCompra);

            await SetPrecioTotalServiciosAdicionales(ordenDeCompra);

            await SetPrecioTotalUf(ordenDeCompra);

            _ordenCompraCliente.HandleClienteDesdeOrdenCompra(ordenDeCompra);

            return await _ordenCompraRepository.Insert(ordenDeCompra);
        }

        public async Task<OrdenDeCompra> Update(OrdenDeCompra orden)
        {
            return await _ordenCompraRepository.Update(orden);
        }

        private async Task SetPrecioTotalUf(OrdenDeCompra ordenDeCompra)
        {
            ordenDeCompra.TotalEnUf = await _calculoPrecioServicioAdicional.CalcularTotalEnUf(ordenDeCompra.ServiciosAdicionales);
        }

        private async Task SetPrecioTotalServiciosAdicionales(OrdenDeCompra ordenDeCompra)
        {
            if (ordenDeCompra.ServiciosAdicionales.Count > 0)
            {
                ordenDeCompra.TotalEnPesoChileno = await _calculoPrecioServicioAdicional.CalcularPrecioTotalServiciosAdicionales(ordenDeCompra.ServiciosAdicionales);

                ordenDeCompra.TotalEnPesoChilenoConIva = await _calculoPrecioServicioAdicional.CalcularPrecioTotalServiciosAdicionalesConIVA(ordenDeCompra.ServiciosAdicionales);
            }
        }

        private void SetFechaEmision(OrdenDeCompra ordenDeCompra)
        {
            ordenDeCompra.FechaEmision = DateTime.Now;
        }

        public void SendEmail(OrdenDeCompra ordenCompra, string html, IEnumerable<string> attachmentsPath)
        {
            _ordenCompraSendEmail.SendEmail(ordenCompra, html, attachmentsPath);
        }

        public Task<IEnumerable<OrdenDeCompra>> GetOrdenesCompraConServicioAnfitrion()
        {
            return _ordenCompraRepository.SearchFor(_ordenCompraQueryFiltro.FindConAnfrion());
        }

        public Task<IEnumerable<OrdenDeCompra>> GetOrdenesCompraByFechaEmisionUsuarioId(DateTime fechaEmision, string usuarioId)
        {
            return _ordenCompraRepository.SearchFor(_ordenCompraQueryFiltro.FindOrdenesCompraByFechaEmisionUsuarioId(fechaEmision, usuarioId));
        }

        public Task<IEnumerable<OrdenDeCompra>> GetOrdenesCompraByFechaEmisionEstadoTransaccionUsuarioId(DateTime fechaEmision, Estados.Transaccion estadoTransaccion, string usuarioId)
        {
            return _ordenCompraRepository.SearchFor(_ordenCompraQueryFiltro.FindOrdenesCompraByFechaEmisionEstadoTransaccionUsuarioId(fechaEmision, estadoTransaccion, usuarioId));
        }

        public async Task<OrdenDeCompra> GetOrdenDeCompraLogin(string usuarioId)
        {
            return await _ordenCompraRepository.FindFirstByOptions(_ordenCompraQueryFiltro.FindOrdenCompraLogin(usuarioId), _ordenCompraQueryFiltro.OrderByUltimaOrdenCompra());
        }

        public async Task<IEnumerable<OrdenDeCompra>> GetOrdenesCompraLogin(string usuarioId)
        {
            return await _ordenCompraRepository.SearchFor(_ordenCompraQueryFiltro.FindOrdenCompraLogin(usuarioId));
        }

        public OrdenDeCompra ClonarOrdenCompra(OrdenDeCompra ordenCompra)
        {
            var ordenCompraClon = ordenCompra;

            ordenCompraClon.Id = new ObjectId();
            _ordenCompraEstado.SetIniciada(ordenCompraClon);
            ordenCompraClon.OrdenCompraAnuladaId = ordenCompra.Id.ToString();

            return ordenCompraClon;
        }

        public void SetServiciosAdicionalesExcluidosCalculoPrecioOrdenCompra(IEnumerable<ServicioAdicional> serviciosAdicionales)
        {
            foreach (var servicioAdicional in serviciosAdicionales)
            {
                servicioAdicional.ExcluidoCalculoPrecioOrdenCompra = true;
            }
        }
    }
}
