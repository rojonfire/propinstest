using System.ComponentModel.DataAnnotations;

namespace Corretaje.Api.Dto.ServicioBase
{
    public class ServicioBaseDto
    {
        public string Id { get; set; }

        [Required(ErrorMessage = "Debe indicar el Nombre")]
        public string Nombre { get; set; }
    }
}
