
using Corretaje.Domain;
using System.ComponentModel.DataAnnotations;

namespace Corretaje.Api.Dto
{
    public class ServicioAdicionalDto
    {
        public bool Excluido { get; set; }

        public string Id { get; set; }

        public string Imagen { get; set; }

        public string ImagenUrl { get; set; }

        [Required(ErrorMessage = "Debe indicar el Nombre")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "Debe indicar el Precio")]
        public decimal Precio { get; set; }

        public string Subtitulo { get; set; }

        [Required(ErrorMessage = "Debe indicar el TipoMoneda")]
        public string TipoMoneda { get; set; }

        public Estados.Transaccion Estado { get; set; }
    }
}
