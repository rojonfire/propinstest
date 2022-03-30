using Corretaje.Domain;
using System.Collections.Generic;

namespace Corretaje.Api.Dto.Propiedad
{
    public class PropiedadDto
    {
        public bool Amoblado { get; set; }
        
          public bool Delete { get; set; }
        public string IdCliente { get; set; }
        public List<string> Ids { get; set; }
        
    }
}
