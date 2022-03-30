using Corretaje.Api.Dto.OrdenCompra;

namespace Corretaje.Api.Dto.Usuario
{
    public class UsuarioLoginDto
    {
        public string ClienteId { get; set; }
        public string Mail { get; set; }
        public string Nombres { get; set; }
        public string UserId { get; set; }
        public string Rut { get; set; }
        public string Telefono { get; set; }
        public string Token { get; set; }
        public string VerificacionCedula { get; set; }
        public OrdenCompraUsuarioLoginDto OrdenCompra { get; set; }
    }
}
