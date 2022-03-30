using Corretaje.Domain;
using System;


namespace Corretaje.Api.Dto.Cliente
{
    public class ClienteDto
    {
        public CuentaCorriente CuentaCorriente { get; set; }

        public DateTime FechaNacimiento { get; set; }

        public string Apellidos { get; set; }

        public string Direccion { get; set; }

        public string EstadoCivil { get; set; }

        public string Id { get; set; }

        public string Mail { get; set; }

        public string Nombres { get; set; }

        public string Oficio { get; set; }

        public string Password { get; set; }

        public string Rut { get; set; }

        public string Telefono { get; set; }

        public string TarjetaDeCredito { get; set; }
    }
}
