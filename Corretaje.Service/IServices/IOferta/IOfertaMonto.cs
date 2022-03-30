namespace Corretaje.Service.IServices.IOferta
{
    public interface IOfertaMonto
    {
        void SetMontoMaximo(Domain.Oferta oferta, decimal monto);

        void SetMontoMinimo(Domain.Oferta oferta, decimal monto);
    }
}
