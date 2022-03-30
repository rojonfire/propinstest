using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IAgenda;
using Corretaje.Service.IServices.IBloqueService.IBloqueCliente;
using Corretaje.Service.Services.Agenda.AgendaBase;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Agenda
{
    public class AgendaClienteService : AgendaService, IAgendaClienteService
    {
        private readonly IBloqueClienteService _bloqueClienteService;

        public AgendaClienteService(IBloqueClienteService bloqueClienteService)
        {
            _bloqueClienteService = bloqueClienteService;
        }

        public async Task<Domain.Agenda.Agenda> Get(string id)
        {
            var bloquesCliente = await _bloqueClienteService.GetByClienteId(id);

            return Get(id, bloquesCliente.AsEnumerable<Bloque>().ToList());
        }

        public async Task<Domain.Agenda.Agenda> GetByPropiedadId(string id)
        {
            var bloquesCliente = await _bloqueClienteService.GetByPropiedadId(id);

            return Get(id, bloquesCliente.AsEnumerable<Bloque>().ToList());
        }
    }
}
