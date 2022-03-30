using System.Collections.Generic;

namespace Corretaje.Domain.Agenda
{
    public class Agenda
    {
        public Agenda()
        {
            Bloques = new Dictionary<Estados.Semana, List<Bloque>>();
        }

        public string Id { get; set; }

        public Dictionary<Estados.Semana, List<Bloque>> Bloques { get; set; }
    }
}
