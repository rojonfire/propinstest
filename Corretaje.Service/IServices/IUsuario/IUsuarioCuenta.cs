using Corretaje.Domain;

namespace Corretaje.Service.IServices.IUsuario
{
    public interface IUsuarioCuenta
    {
        void SetTipoAdministrador(Usuario usuario);

        void SetTipoUsuario(Usuario usuario);

        void SetAgentType(Usuario user);
    }
}
