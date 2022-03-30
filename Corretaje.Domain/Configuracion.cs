using Corretaje.Repository;

namespace Corretaje.Domain
{
    public class Configuracion : Entity
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
