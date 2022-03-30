using Corretaje.Common.Extension;
using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IAgenda;
using Corretaje.Service.IServices.IBloqueService.IBloqueAgente;
using Corretaje.Service.Services.Agenda.AgendaBase;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Agenda
{
    public class AgendaAgenteService : AgendaService, IAgendaAgenteService
    {
        private readonly IBloqueAgenteService _bloqueAgenteService;

        public AgendaAgenteService(IBloqueAgenteService bloqueAgenteService)
        {
            _bloqueAgenteService = bloqueAgenteService;
        }

        public async Task<Domain.Agenda.Agenda> Get(string id, string proyectoId)
        {
            var bloquesAgente = await _bloqueAgenteService.GetByAgenteIdAndProyectoId(id, proyectoId);

            return Get(id, bloquesAgente.AsEnumerable<Bloque>().ToList());
        }

        public async Task<IEnumerable<Domain.Agenda.Agenda>> GetAgendas()
        {
            var agendas = new List<Domain.Agenda.Agenda>();

            var bloqueAgentes = await _bloqueAgenteService.GetAll();

            if (bloqueAgentes.IsNullOrEmpty())
            {
                return agendas;
            }

            var bloquesAgentes = bloqueAgentes.GroupBy(bloque => bloque.AgenteId);

            foreach (var bloques in bloquesAgentes)
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
        
        public async Task<IEnumerable<Domain.Agenda.Agenda>> GetAgendas(string proyectoId)
        {
            var agendas = new List<Domain.Agenda.Agenda>();

            var bloqueAgentes = await _bloqueAgenteService.GetByProyectoId( proyectoId);

            //var bloqueAgentes = await _bloqueAgenteService.GetAll();

            if (bloqueAgentes.IsNullOrEmpty())
            {
                return agendas;
            }

            var bloquesAgentes = bloqueAgentes.GroupBy(bloque => bloque.ProyectoId);

            foreach (var bloques in bloquesAgentes)
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
