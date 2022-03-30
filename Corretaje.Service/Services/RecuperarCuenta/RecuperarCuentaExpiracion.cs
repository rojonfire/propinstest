using Corretaje.Service.IServices.IRecuperarCuenta;
using System;

namespace Corretaje.Service.Services.RecuperarCuenta
{
    public class RecuperarCuentaExpiracion : IRecuperarCuentaExpiracion
    {
        private const int ConvertirEnNegativo = -1;
        private readonly IRecuperarCuentaConfiguracion _recuperarCuentaConfiguracion;        

        public RecuperarCuentaExpiracion(IRecuperarCuentaConfiguracion recuperarCuentaConfiguracion)
        {
            _recuperarCuentaConfiguracion = recuperarCuentaConfiguracion;
        }

        public bool EstaTiempoExpirado(Domain.RecuperarCuenta recuperarCuenta)
        {
            return SolicitudRecuperarCuentaSuperoVigenciaDeEspera(recuperarCuenta);
        }

        private bool SolicitudRecuperarCuentaSuperoVigenciaDeEspera(Domain.RecuperarCuenta recuperarCuenta)
        {
            int restarMinutos = _recuperarCuentaConfiguracion.VigenciaMinutos * ConvertirEnNegativo;

            return DateTime.Now.AddMinutes(restarMinutos) > recuperarCuenta.CreatedAt;
        }
    }
}
