using Corretaje.Domain;

namespace Corretaje.Service.IServices.IOrdenCompra
{
    public interface IOrdenCompraEstado
    {
        void SetExitosa(OrdenDeCompra ordenCompra);
        void SetIniciada(OrdenDeCompra ordenCompra);
        void SetFallida(OrdenDeCompra ordenCompra);
        void SetAnulada(OrdenDeCompra ordenCompra);
    }
}
