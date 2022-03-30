using Corretaje.Common.Extension;
using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IAgenda;
using Corretaje.Service.IServices.IBloqueService.IBloqueFotografo;
using Corretaje.Service.Services.Agenda.AgendaBase;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Agenda
{
    public class AgendaFotografoService : AgendaService, IAgendaFotografoService
    {
        private readonly IBloqueFotografoService _bloqueFotografoService;

        public AgendaFotografoService(IBloqueFotografoService bloqueFotografoService)
        {
            _bloqueFotografoService = bloqueFotografoService;
        }

        public async Task<Domain.Agenda.Agenda> Get(string id)
        {
            var bloquesFotografo = await _bloqueFotografoService.GetByFotografoId(id);

            return Get(id, bloquesFotografo.AsEnumerable<Bloque>().ToList());
        }

        // Refactorizar esto :( grrrr!!!!
        public async Task<IEnumerable<Domain.Agenda.Agenda>> GetAgendas()
        {
            var agendas = new List<Domain.Agenda.Agenda>();

            var bloquesFotografos = await _bloqueFotografoService.GetAll();

            if (bloquesFotografos.IsNullOrEmpty())
            {
                return agendas;
            }

            var bloquesPorFotografo = bloquesFotografos.GroupBy(bloque => bloque.FotografoId);

            foreach (var bloques in bloquesPorFotografo)
            {
                var bloquesPorDia = bloques.GroupBy(bloque => bloque.Dia);

                agendas.Add(new Domain.Agenda.Agenda()
                {
                    Id = bloques.Key,
                    Bloques = bloquesPorDia.ToDictionary(g => g.Key, g => g.AsEnumerable<Bloque>().ToList())
                });
            }

            return agendas;
        }
    }
}
