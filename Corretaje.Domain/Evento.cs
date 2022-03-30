using System;

namespace Corretaje.Domain
{
    public class Evento
    {
        public string Name { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public string Classes { get; set; }
        public string Id { get; set; }
        public string Duration { get; set; }
        public string Estado { get; set; }
        public string IdUsuario { get; set; }
    }

}
