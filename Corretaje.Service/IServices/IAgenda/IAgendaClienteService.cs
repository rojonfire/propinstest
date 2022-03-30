using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IAgenda.IAgendaBase;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IAgenda
{
    public interface IAgendaClienteService : IAgendaService
    {
        Task<Agenda> Get(string id);

        Task<Agenda> GetByPropiedadId(string id);
    }
}
