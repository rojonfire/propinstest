using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IAgenda.IAgendaBase;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IAgenda
{
    public interface IAgendaFotografoService : IAgendaService
    {
        Task<Agenda> Get(string id);

        Task<IEnumerable<Agenda>> GetAgendas();
    }
}
