using System.Collections.Generic;

namespace Corretaje.Api.Dto.Tasacion
{
    public class ReferenciaDeMercadoDto
    {
        public ReferenciaDeMercadoDto()
        {
            DetallesReferencias = new List<DetallesReferenciaDto>();
        }

        public double PromedioM2 { get; set; }

        public IEnumerable<DetallesReferenciaDto> DetallesReferencias { get; set; }

        public int PromedioValoracionUF { get; set; }

        public string Informe { get; set; }
    }
}
