
namespace Corretaje.Service.IServices.IOferta
{
    public interface IOfertaConfiguration
    {
        decimal OfertaPorcentajeMinimo { get; }

        int OfertaVigencia { get; }

        string EMailAdmin { get; }

        string EmailAlvaro { get; }

        string EmailAsuntoOfertaAceptadaVendedor { get; }

        string EmailAsuntoOfertaAceptadaComprador { get; }

        string EmailAsuntoOfertaDeclinada { get; }

        string EmailAsuntoOfertaEmitidaVendedor { get; }

        string EmailAsuntoOfertaEmitidaComprador { get; set; }

        string EmailAsuntoOfertaEmitidaCopiaAdministrador { get; }        

        string EmailAsuntoOfertaRechazadaComprador { get; }

        string EmailAsuntoOfertaRechazadaVendedor { get; }

        string FromAddress { get; }

        string UrlContraOferta { get; }

        string UrlReOfertar { get; }
    }
}
