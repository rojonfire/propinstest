using Corretaje.Api.Dto.Oferta;
using Corretaje.Service.IServices.IOferta;

namespace Corretaje.Api.Commons.Oferta
{
    public class OfertaHelper : IOfertaHelper
    {
        private readonly IOfertaConfiguration OfertaConfiguration;

        public OfertaHelper(IOfertaConfiguration ofertaConfiguration)
        {
            OfertaConfiguration = ofertaConfiguration;
        }

        public void SetUrlContraOferta(OfertaDto ofertaEmail)
        {
            ofertaEmail.UrlContraOferta = OfertaConfiguration.UrlContraOferta;
        }

        public void SetUrlReOfertar(OfertaDto ofertaEmail)
        {
            ofertaEmail.UrlReOfertar = OfertaConfiguration.UrlReOfertar;
        }
    }
}
