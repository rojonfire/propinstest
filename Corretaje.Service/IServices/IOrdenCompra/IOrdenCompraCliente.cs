using Corretaje.Domain;

namespace Corretaje.Service.IServices.IOrdenCompra
{
    public interface IOrdenCompraCliente
    {
        /// <summary>
        /// Crea al cliente y actualiza el atributo ClienteId en la entidad Usuario
        /// </summary>
        /// <param name="ordenCompra">Orden de compra para insertar</param>
        void HandleClienteDesdeOrdenCompra(OrdenDeCompra ordenCompra);
    }
}
