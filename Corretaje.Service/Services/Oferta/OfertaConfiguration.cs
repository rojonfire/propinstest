using Corretaje.Service.IServices.IOferta;

namespace Corretaje.Service.Services.Oferta
{
    public class OfertaConfiguration : IOfertaConfiguration
    {
        public decimal OfertaPorcentajeMinimo { get; set; }

        public int OfertaVigencia { get; set; }

        public string EMailAdmin { get; set; }

        public string EmailAsuntoOfertaAceptadaVendedor { get; set; }
        public string EmailAsuntoOfertaAceptadaComprador { get; set; }

        public string EmailAsuntoOfertaDeclinada { get; set; }

        public string EmailAsuntoOfertaEmitidaVendedor { get; set; }
        public string EmailAsuntoOfertaEmitidaComprador { get; set; }

        public string EmailAsuntoOfertaRechazadaComprador { get; set; }
        public string EmailAsuntoOfertaRechazadaVendedor { get; set; }

        public string FromAddress { get; set; }

        public string LoginUrl { get; set; }

        public string UrlContraOferta { get; set; }

        public string UrlReOfertar { get; set; }

        public string EmailAsuntoOfertaEmitidaCopiaAdministrador { get; set; }

        public string EmailAlvaro { get; set; }
    }
}
