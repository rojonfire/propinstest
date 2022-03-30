using Corretaje.Service.IServices;
using Corretaje.Domain;
using Corretaje.Repository;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services
{
    public class CounterService : Repository<Counter>, ICounterService
    {
        private readonly IRepository<Counter> _counterRepository;

        public CounterService(string connectionstring) : base(connectionstring)
        {
            _counterRepository = new Repository<Counter>(connectionstring);
        }

        public async Task<int> GetSequenceValue(string sequenceName)
        {
            var sequences = await _counterRepository.GetAll();
            var counter = sequences.AsQueryable().FirstOrDefault();
            counter.SequenceValue += 1;
            await _counterRepository.Update(counter);
            return counter.SequenceValue;
        }
    }
}
