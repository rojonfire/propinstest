using Corretaje.Api.Dto.Usuario;

namespace Corretaje.Api.Commons.Usuario
{
    public interface IUsuarioHelper
    {
        void SetUrlRegistroReferido(UsuarioRegistroEmailDto emailRegistro);
    }
}