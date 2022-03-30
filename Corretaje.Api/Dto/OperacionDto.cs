using System.Collections.Generic;

namespace Corretaje.Api.Dto
{
    public class OperacionDto
    {
        public string IdPropiedad { get; set; }
        public string Tipo { get; set; }
        public string Plan { get; set; }
        public List<string> ServiciosAdicionales { get; set; }
    }
}
