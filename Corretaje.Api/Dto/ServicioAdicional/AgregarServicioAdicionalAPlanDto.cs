using System.ComponentModel.DataAnnotations;

namespace Corretaje.Api.Dto.ServicioAdicional
{
    public class AgregarServicioAdicionalAPlanDto
    {
        [Required(ErrorMessage = "Debe indicar el Id")]
        public string Id { get; set; }

    }
}
