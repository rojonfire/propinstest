using Corretaje.Domain;
using System.Collections.Generic;

namespace Corretaje.Api.Dto.Agenda
{
    public class AgendaDto
    {
        public AgendaDto()
        {
            Bloques = new Dictionary<Estados.Semana, List<BloqueDto>>();
        }

        public string Id { get; set; }
        public Dictionary<Estados.Semana, List<BloqueDto>> Bloques { get; set; }
    }
}