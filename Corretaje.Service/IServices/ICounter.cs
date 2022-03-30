using System.Collections.Generic;
using System.Threading.Tasks;
using Corretaje.Common;
using Corretaje.Domain;
using Corretaje.Repository;


namespace Corretaje.Service.IServices
{
    public interface ICounterService : IRepository<Counter>
    {
        Task<int> GetSequenceValue(string sequenceName);
    }
}
