using Corretaje.Api.Dto.Usuario;
using Corretaje.Service.IServices.IUsuario;

namespace Corretaje.Api.Commons.Usuario
{
    public class UsuarioHelper : IUsuarioHelper
    {
        private readonly IUsuarioConfiguracion _usuarioConfiguracion;

        public UsuarioHelper(IUsuarioConfiguracion usuarioConfiguracion)
        {
            _usuarioConfiguracion = usuarioConfiguracion;
        }

        public void SetUrlRegistroReferido(UsuarioRegistroEmailDto emailRegistro)
        {
            emailRegistro.LinkRegistro = $"{_usuarioConfiguracion.UrlBaseRegistro}&nombre={emailRegistro.Nombres}&email={emailRegistro.Email}&telefono={emailRegistro.Telefono}&esEmbajador={emailRegistro.EsEmbajador}";
        }
    }
}
