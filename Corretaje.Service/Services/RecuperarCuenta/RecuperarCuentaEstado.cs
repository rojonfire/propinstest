using Corretaje.Domain;
using Corretaje.Service.IServices.IRecuperarCuenta;

namespace Corretaje.Service.Services.RecuperarCuenta
{
    public class RecuperarCuentaEstado : IRecuperarCuentaEstado
    {
        public void SetEstadoExpirado(Domain.RecuperarCuenta recuperarCuenta)
        {
            SetEstado(recuperarCuenta, Estados.RecuperarCuenta.Expirado);
        }

        public void SetEstadoVigente(Domain.RecuperarCuenta recuperarCuenta)
        {
            SetEstado(recuperarCuenta, Estados.RecuperarCuenta.Vigente);
        }

        private void SetEstado(Domain.RecuperarCuenta recuperarCuenta, Estados.RecuperarCuenta estado)
        {
            recuperarCuenta.Estado = estado;
        }
    }
}
