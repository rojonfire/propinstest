using System.ComponentModel.DataAnnotations;

namespace Corretaje.Api.Dto.ServicioBase
{
    public class AgregarServicioBaseDto
    {
        [Required(ErrorMessage = "Debe indicar el Nombre")]
        public string Nombre { get; set; }
    }
}
