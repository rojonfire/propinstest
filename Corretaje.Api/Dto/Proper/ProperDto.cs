using System.Collections.Generic;

namespace Corretaje.Api.Dto.Proper
{
    public class ProperDto
    {
        public string Nombres { get; set; }

        public string Apellidos { get; set; }

        public string Rut { get; set; }

        public string Email { get; set; }

        public string Telefono { get; set; }

        public DatosBancariosDto DatosBancarios;

        public ReferirProperDto  Referidos;

        public List<string> Referencias { get; set; }

        public long NumeroCuenta { get; set; }

        public int Edad { get; set; }

        public string Direccion { get; set; }

        public string Password { get; set; }

        public string ProperId { get; set; }

    }
}