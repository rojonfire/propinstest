using Corretaje.Service.IServices.IRecuperarCuenta;
using System;

namespace Corretaje.Service.Services.RecuperarCuenta
{
    public class RecuperarCuentaGuid : IRecuperarCuentaGuid
    {
        public void GenerarGuid(Domain.RecuperarCuenta recuperarCuenta)
        {
            recuperarCuenta.Guid = Guid.NewGuid().ToString();
        }
    }
}
