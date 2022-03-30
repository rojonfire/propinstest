using System.Collections.Generic;

namespace Corretaje.Api.Dto.Proper
{
    public class ReferidoDto
    {
        public string Id { get; set; }
        public string Nombres { get; set; }
        
        public string Apellido { get; set; }

        public string Mail { get; set; }
        
        public List<string> Referencias { get; set; }

        public string Rut { get; set; }
        
        public string Telefono { get; set; }
        
        public int Edad { get; set; }
        
        public string Comuna { get; set; }
        
        public string Password { get; set; }
    }
}