namespace Corretaje.Service.IServices.IOferta
{
    public interface IOfertaEmision
    {
        void SetEmitidaPorUsuario(Domain.Oferta oferta);

        void SetEmitidaPorCliente(Domain.Oferta oferta);
    }
}
