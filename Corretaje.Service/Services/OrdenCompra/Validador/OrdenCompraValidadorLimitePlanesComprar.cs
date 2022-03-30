using Corretaje.Domain;
using Corretaje.Service.IServices.IOrdenCompra;
using Corretaje.Service.IServices.IValidador;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.OrdenCompra.Validador
{
    public class OrdenCompraValidadorLimitePlanesComprar : IValidador<OrdenDeCompra>
    {
        private const int _maximoPlanesPorUsuario = 25;
        private DateTime _fechaInicioRestriccion = new DateTime(2019, 5, 27);
        private DateTime _fechaFinRestriccion = new DateTime(2019, 5, 30);

        private readonly IOrdenCompraService _ordenCompraService;

        public OrdenCompraValidadorLimitePlanesComprar(IOrdenCompraService ordenCompraService)
        {
            _ordenCompraService = ordenCompraService;
        }

        public IEnumerable<string> Errores(OrdenDeCompra ordenCompra)
        {
            return new List<string>() { $"Entre el 27/05/2019 y el 30/05/2019 Ud puede comprar hasta {_maximoPlanesPorUsuario} planes" };
        }

        public async Task<bool> EsValido(OrdenDeCompra ordenCompra)
        {
            if (DateTime.Now.Date >= _fechaFinRestriccion)
            {
                return true;
            }

            var ordenesCompra = await _ordenCompraService.GetOrdenesCompraByFechaEmisionEstadoTransaccionUsuarioId(_fechaInicioRestriccion, Estados.Transaccion.Exitosa, ordenCompra.UsuarioId);

            if (ordenesCompra == null)
            {
                return true;
            }

            return ordenesCompra.ToList().Count < _maximoPlanesPorUsuario;
        }
    }
}
