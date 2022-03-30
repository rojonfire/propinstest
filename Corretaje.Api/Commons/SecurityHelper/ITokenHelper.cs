namespace Corretaje.Api.Commons.SecurityHelper
{
    public interface ITokenHelper
    {
        string GenerarTokenUsuarioLogin(string usuarioId);

        string GenerarTokenUsuarioRecuperarContraseña(string usuarioEMail);
    }
}
