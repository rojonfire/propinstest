using Corretaje.Domain;

namespace Corretaje.Service.IServices.IOferta
{
    public interface IOfertaSendEMail
    {
        void OfertaSendEMailOfertaAceptadaComprador(Oferta oferta, string html);

        void OfertaSendEMailOfertaAceptadaVendedor(Oferta oferta, string html);

        void OfertaSendEMailOfertaDeclinadaComprador(Oferta oferta, string html);

        void OfertaSendEMailOfertaDeclinadaVendedor(Oferta oferta, string html);

        void OfertaSendEMailOfertaRechazadaComprador(Oferta oferta, string html);

        void OfertaSendEMailOfertaRechazadaVendedor(Oferta oferta, string html);

        void OfertaSendEmailOfertaEmitidaVendedor(Oferta oferta, string html);

        void OfertaSendEmailOfertaEmitidaCopiaAdministrador(string html);

        void OfertaSendEmailOfertaEmitidaComprador(Domain.Oferta oferta, string html);
    }
}
