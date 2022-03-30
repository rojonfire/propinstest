using System;

namespace Corretaje.Domain
{
    public class MensajeOferta
    {
        public DateTime FechaEmision { get; set; }

        public string EmitidoPorUsuarioId { get; set; }

        public string Texto { get; set; }
    }
}
