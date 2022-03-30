using Corretaje.Service.IServices.IOferta;

namespace Corretaje.Service.Services.Oferta
{
    public class OfertaMonto : IOfertaMonto
    {
        public void SetMontoMaximo(Domain.Oferta oferta, decimal monto)
        {
            oferta.MontoMaximo = monto;
        }

        public void SetMontoMinimo(Domain.Oferta oferta, decimal monto)
        {
            oferta.MontoMinimo = monto;
        }
    }
}
