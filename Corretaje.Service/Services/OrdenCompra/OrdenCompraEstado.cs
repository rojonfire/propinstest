using Corretaje.Domain;
using Corretaje.Service.IServices.IOrdenCompra;

namespace Corretaje.Service.Services.OrdenCompra
{
    public class OrdenCompraEstado : IOrdenCompraEstado
    {
        public void SetAnulada(OrdenDeCompra ordenCompra)
        {
            SetEstado(ordenCompra, Estados.Transaccion.Anulada);
        }

        public void SetExitosa(OrdenDeCompra ordenCompra)
        {
            SetEstado(ordenCompra, Estados.Transaccion.Exitosa);
        }

        public void SetFallida(OrdenDeCompra ordenCompra)
        {
            SetEstado(ordenCompra, Estados.Transaccion.Fallida);
        }

        public void SetIniciada(OrdenDeCompra ordenCompra)
        {
            SetEstado(ordenCompra, Estados.Transaccion.Iniciada);
        }

        private void SetEstado(OrdenDeCompra ordenCompra, Estados.Transaccion estado)
        {
            ordenCompra.Estado = estado;
        }
    }
}
