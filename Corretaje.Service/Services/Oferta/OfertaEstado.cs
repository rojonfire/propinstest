using Corretaje.Domain;
using Corretaje.Service.IServices.IOferta;

namespace Corretaje.Service.Services.Oferta
{
    public class OfertaEstado : IOfertaEstado
    {
        private void SetOfertaEstado(Domain.Oferta oferta, Estados.Oferta estado)
        {
            oferta.Estado = estado;
        }

        public void SetOfertaEstadoAceptada(Domain.Oferta oferta)
        {
            SetOfertaEstado(oferta, Estados.Oferta.Aceptada);
        }

        public void SetOfertaEstadoContratoBorrador(Domain.Oferta oferta)
        {
            SetOfertaEstado(oferta, Estados.Oferta.ContratoBorrador);
        }

        public void SetOfertaEstadoContratoFinalizado(Domain.Oferta oferta)
        {
            SetOfertaEstado(oferta, Estados.Oferta.ContratoFinalizado);
        }

        public void SetOfertaEstadoDeclinada(Domain.Oferta oferta)
        {
            SetOfertaEstado(oferta, Estados.Oferta.Declinada);
        }

        public void SetOfertaEstadoRechazada(Domain.Oferta oferta)
        {
            SetOfertaEstado(oferta, Estados.Oferta.Rechazada);
        }

        public void SetOfertaSinEstado(Domain.Oferta oferta)
        {
            SetOfertaEstado(oferta, Estados.Oferta.Null);
        }
    }
}
