using Corretaje.Api.Dto.Oferta;

namespace Corretaje.Api.Commons.Oferta
{
    public interface IOfertaHelper
    {
        void SetUrlContraOferta(OfertaDto ofertaEmail);

        void SetUrlReOfertar(OfertaDto ofertaEmail);
    }
}
