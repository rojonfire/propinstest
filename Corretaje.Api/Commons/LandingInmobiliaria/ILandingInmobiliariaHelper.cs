using Corretaje.Api.Dto.LandingInmobiliaria;

namespace Corretaje.Api.Commons.LandingInmobiliaria
{
    public interface ILandingInmobiliariaHelper
    {
        void SetPathname(LandingInmobiliariaCrearEditarDto landingDto, string nombre);
    }
}
