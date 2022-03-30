using Corretaje.Domain;
using Corretaje.Service.IServices.IOferta;

namespace Corretaje.Service.Services.Oferta
{
    public class OfertaEmsion : IOfertaEmision
    {
        public void SetEmitidaPorUsuario(Domain.Oferta oferta)
        {
            SetOfertaEmitida(oferta, Estados.OfertaEmision.Usuario);
        }

        public void SetEmitidaPorCliente(Domain.Oferta oferta)
        {
            SetOfertaEmitida(oferta, Estados.OfertaEmision.Cliente);
        }

        private void SetOfertaEmitida(Domain.Oferta oferta, Estados.OfertaEmision emitidaPor)
        {
            oferta.EmitidaPor = emitidaPor;
        }

    }
}
