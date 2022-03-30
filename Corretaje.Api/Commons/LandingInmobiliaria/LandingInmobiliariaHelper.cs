using Corretaje.Api.Dto.LandingInmobiliaria;
using Corretaje.Service.IServices.ILandingInmobiliaria;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Api.Commons.LandingInmobiliaria
{
    public class LandingInmobiliariaHelper : ILandingInmobiliariaHelper
    {
        private readonly ILandingInmobiliariaConfiguracion _landingInmobiliariaConfiguracion;

        public LandingInmobiliariaHelper(ILandingInmobiliariaConfiguracion landingInmobiliariaConfiguracion)
        {
            _landingInmobiliariaConfiguracion = landingInmobiliariaConfiguracion;
        }

        public void SetPathname(LandingInmobiliariaCrearEditarDto landingDto, string nombre)
        {
            landingDto.Pathname = nombre.ToLower().Replace(" ", "");
        }
    }
}
