using Corretaje.Domain;

namespace Corretaje.Service.IServices.IRecuperarCuenta
{
    public interface IRecuperarCuentaExpiracion
    {
        bool EstaTiempoExpirado(RecuperarCuenta recuperarCuenta);
    }
}
