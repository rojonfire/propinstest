using System.ComponentModel.DataAnnotations;

namespace Corretaje.Api.Dto.Embajador
{
    public class ReferirEmbajadorDto
    {
        [Required(ErrorMessage = "Los nombres son requeridos")]
        public string Nombres { get; set; }

        [Required(ErrorMessage = "El email es requerido")]
        public string Email { get; set; }

        public string Telefono { get; set; }
    }
}
