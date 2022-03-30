using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IBroker
{
    public interface IBrokerService
    {
        Task<Domain.Broker> Get(ObjectId id);

        Task<IEnumerable<Domain.Broker>> GetAll();

        Task<Domain.Broker> GetByEmail(string email);

        Task<Domain.Broker> Add(Domain.Broker broker);

        Task<Domain.Broker> Update(Domain.Broker broker);
    }
}
