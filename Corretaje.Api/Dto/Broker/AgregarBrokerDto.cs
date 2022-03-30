using Corretaje.Api.Dto.Proper;

namespace Corretaje.Api.Dto.Broker
{
    public class AgregarBrokerDto
    {
        public string Nombres { get; set; }

        public string Apellidos { get; set; }

        public string Rut { get; set; }

        public string Email { get; set; }

        public string Telefono { get; set; }

        public int Edad { get; set; }

        public string Direccion { get; set; }

        public DatosBancariosDto DatosBancarios { get; set; }
    }
}
