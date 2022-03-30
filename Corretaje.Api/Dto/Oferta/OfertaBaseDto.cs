
using System.ComponentModel.DataAnnotations;

namespace Corretaje.Api.Dto.Oferta
{
    public class OfertaBaseDto
    {
        [Required(ErrorMessage = "Debe indicar el OfertadorId")]
        public string OfertadorId { get; set; }

        [Required(ErrorMessage = "Debe indicar el PropietarioId")]
        public string PropietarioId { get; set; }

        [Required(ErrorMessage = "Debe indicar la PublicacionId")]
        public string PublicacionId { get; set; }
    }
}
