using System;

namespace Corretaje.Api.Dto
{
    public class MensajeOfertaDto
    {
        public DateTime FechaEmision { get; set; }

        public string EmitidoPorUsuarioId { get; set; }

        public string Texto { get; set; }
    }
}
