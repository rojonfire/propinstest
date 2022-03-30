using System.Collections.Generic;

namespace Corretaje.Domain.Tasacion
{
    public class ReferenciaDeMercado
    {
        public double PromedioM2 { get; set; }
        public IEnumerable<DetallesReferencia> DetallesReferencias { get; set; }
        public int PromedioValoracionUf { get; set; }
        
        public string Informe { get; set; }
    }
}
