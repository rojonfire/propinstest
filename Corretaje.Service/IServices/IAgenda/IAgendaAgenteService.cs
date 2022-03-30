using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IAgenda.IAgendaBase;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IAgenda
{
    public interface IAgendaAgenteService : IAgendaService
    {
        Task<Agenda> Get(string id, string proyectoId);

        Task<IEnumerable<Agenda>> GetAgendas();
        
        Task<IEnumerable<Agenda>> GetAgendas(string proyectoId);
    }
}
