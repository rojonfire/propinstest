using Corretaje.Domain;

namespace Corretaje.Api.Dto.RecuperarCuenta
{
    public class RecuperarCuentaDto
    {
        public Estados.RecuperarCuenta Estado { get; set; }

        public string Id { get; set; }

        public string Link { get; set; }

        public string UsuarioEmail { get; set; }
    }
}
