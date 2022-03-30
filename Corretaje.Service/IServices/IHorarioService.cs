using Corretaje.Domain;
using Corretaje.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices
{
    public interface IHorarioService : IRepository<Horario>
    {
        Task<List<Horario>> GetHorarioPorUser(string userId);
    }
}
