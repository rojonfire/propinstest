using System.Collections.Generic;
using Corretaje.Repository;

namespace Corretaje.Domain
{
    public class ReferidoProper : Entity
    {
        public string Nombres { get; set; }
        
        public string Apellido { get; set; }
        
        public string Email { get; set; }

        public List<string> Referencias { get; set; }

        public bool Paso1 { get; set; }
        
        public bool Paso2 { get; set; }
        
        public bool Paso3 { get; set; }
        
        public bool Paso4 { get; set; }
    }
}