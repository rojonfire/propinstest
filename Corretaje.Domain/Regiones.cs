using System.Collections.Generic;
using Corretaje.Repository;


namespace Corretaje.Domain
{
    public class Regiones : Entity
    {
        public List<Region> regiones { get; set; }

    }

    public class Region
    {
        public int numero { get; set; }
        public string region { get; set; }
        public List<string> comunas { get; set; }
    }
}
