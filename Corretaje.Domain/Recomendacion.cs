using System.Collections.Generic;

namespace Corretaje.Domain
{
    public class Recomendacion
    {
        public Recomendacion()
        {
            Propiedades = new List<Propiedad>();
        }

        public string Email { get; set; }

        public IEnumerable<Propiedad> Propiedades { get; set; }
    }
}
