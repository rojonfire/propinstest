using Corretaje.Service.IServices.IRecuperarCuenta;

namespace Corretaje.Service.Services.RecuperarCuenta
{
    public class RecuperarCuentaLink : IRecuperarCuentaLink
    {
        private readonly IRecuperarCuentaConfiguracion _recuperarCuentaConfiguracion;

        public RecuperarCuentaLink(IRecuperarCuentaConfiguracion recuperarCuentaConfiguracion)
        {
            _recuperarCuentaConfiguracion = recuperarCuentaConfiguracion;
        }

        public void SetLink(Domain.RecuperarCuenta recuperarCuenta)
        {
            recuperarCuenta.Link = $"{_recuperarCuentaConfiguracion.Url}{recuperarCuenta.Guid}";
        }
    }
}
