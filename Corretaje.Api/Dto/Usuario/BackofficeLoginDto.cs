using Corretaje.Domain;

namespace Corretaje.Api.Dto.Usuario
{
    public class BackofficeLoginDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Nombres { get; set; }
        public string Rut { get; set; }
        public string Token { get; set; }
        public string InmobiliariaId { get; set; }
        public Estados.TipoCuenta TipoCuenta { get; set; }
    }
}
