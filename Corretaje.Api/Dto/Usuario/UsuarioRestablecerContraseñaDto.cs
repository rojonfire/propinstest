namespace Corretaje.Api.Dto.Usuario
{
    public class UsuarioRestablecerContraseñaDto
    {
        public string RecuperarCuentaId { get; set; }
        public string Mail { get; set; }
        public string Password { get; set; }
    }
}
