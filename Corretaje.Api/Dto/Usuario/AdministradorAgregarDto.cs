using System;
using System.ComponentModel.DataAnnotations;

namespace Corretaje.Api.Dto.Usuario
{
    public class AdministradorAgregarDto
    {
        public DateTime FechaNacimiento { get; set; }
        public string Apellidos { get; set; }
        public string Direccion { get; set; }
        public string EstadoCivil { get; set; }

        [Required(ErrorMessage = "Debe indicar el email")]
        public string Mail { get; set; }

        public string Nombres { get; set; }
        public string Oficio { get; set; }

        [Required(ErrorMessage = "Debe indicar el Password")]
        public string Password { get; set; }

        public string Rut { get; set; }
        public string Telefono { get; set; }
    }
}
