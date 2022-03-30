
namespace Corretaje.Service.IServices.IOferta
{
    public interface IOfertaEstado
    {
        void SetOfertaEstadoAceptada(Domain.Oferta oferta);

        void SetOfertaEstadoContratoBorrador(Domain.Oferta oferta);

        void SetOfertaEstadoContratoFinalizado(Domain.Oferta oferta);

        void SetOfertaEstadoDeclinada(Domain.Oferta oferta);

        void SetOfertaEstadoRechazada(Domain.Oferta oferta);

        void SetOfertaSinEstado(Domain.Oferta oferta);
    }
}
