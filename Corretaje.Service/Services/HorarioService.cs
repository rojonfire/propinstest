using Corretaje.Service.IServices;
using Corretaje.Domain;
using Corretaje.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services
{
    public class HorarioService : Repository<Horario>, IHorarioService
    {
        private readonly IRepository<Horario> _horarioRepository;

        public HorarioService(string connectionstring) : base(connectionstring)
        {
            _horarioRepository = new Repository<Horario>(connectionstring);

        }

        public async Task<List<Horario>> GetHorarioPorUser(string userId)
        {
            var resultado = await _horarioRepository.GetAll();

            var enumerable = resultado as Horario[] ?? resultado.ToArray();
            if (!enumerable.Any()) return new List<Horario>();
            var res = enumerable.Where(h => h.IdUsuario == userId);
            return res.ToList();
        }
    }
}
