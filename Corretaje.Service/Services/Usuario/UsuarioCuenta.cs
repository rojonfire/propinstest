using Corretaje.Domain;
using Corretaje.Service.IServices.IUsuario;

namespace Corretaje.Service.Services.Usuario
{
    public class UsuarioCuenta : IUsuarioCuenta
    {
        public void SetAgentType(Domain.Usuario user)
        {
            SetTipoCuenta(user, Estados.TipoCuenta.Agente);
        }

        public void SetTipoAdministrador(Domain.Usuario usuario)
        {
            SetTipoCuenta(usuario, Estados.TipoCuenta.Administrador);
        }

        public void SetTipoUsuario(Domain.Usuario usuario)
        {
            SetTipoCuenta(usuario, Estados.TipoCuenta.Usuario);
        }

        private void SetTipoCuenta(Domain.Usuario usuario, Estados.TipoCuenta tipoCuenta)
        {
            usuario.TipoCuenta = tipoCuenta;
        }
    }
}
