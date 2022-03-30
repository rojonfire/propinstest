using Corretaje.Domain;

namespace Corretaje.Service.IServices.IRecuperarCuenta
{
    public interface IRecuperarCuentaEstado
    {
        void SetEstadoExpirado(RecuperarCuenta recuperarCuenta);

        void SetEstadoVigente(RecuperarCuenta recuperarCuenta);
    }
}
