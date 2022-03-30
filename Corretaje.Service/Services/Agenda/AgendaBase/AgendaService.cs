using Corretaje.Common.Extension;
using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IAgenda.IAgendaBase;
using System.Collections.Generic;
using System.Linq;

namespace Corretaje.Service.Services.Agenda.AgendaBase
{
    public abstract class AgendaService : IAgendaService
    {
        public Domain.Agenda.Agenda Get(string id, List<Bloque> bloques)
        {
            if (bloques.IsNullOrEmpty())
            {
                return new Domain.Agenda.Agenda();
            }

            return new Domain.Agenda.Agenda()
            {
                Id = id,
                Bloques = bloques.GroupBy(bloque => bloque.Dia).ToDictionary(g => g.Key, g => g.ToList())
            };
        }
    }
}
