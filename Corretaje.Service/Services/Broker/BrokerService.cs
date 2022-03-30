using Corretaje.Repository;
using Corretaje.Service.IServices.IBroker;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Broker
{
    public class BrokerService : IBrokerService
    {
        private readonly IRepository<Domain.Broker> _brokerRepository;
        private readonly IBrokerQueryFiltro _brokerQueryFiltro;

        public BrokerService(IRepository<Domain.Broker> brokerRepository, IBrokerQueryFiltro brokerQueryFiltro)
        {
            _brokerRepository = brokerRepository;
            _brokerQueryFiltro = brokerQueryFiltro;
        }

        public async Task<Domain.Broker> Get(ObjectId id)
        {
            return await _brokerRepository.Get(id);
        }

        public async Task<IEnumerable<Domain.Broker>> GetAll()
        {
            return await _brokerRepository.GetAll();
        }

        public async Task<Domain.Broker> GetByEmail(string email)
        {
            var broker = await _brokerRepository.SearchFor(_brokerQueryFiltro.FindByEmail(email));
            return broker.FirstOrDefault();
        }

        public async Task<Domain.Broker> Add(Domain.Broker broker)
        {
            return await _brokerRepository.Insert(broker);
        }

        public async Task<Domain.Broker> Update(Domain.Broker broker)
        {
            return await _brokerRepository.Update(broker);
        }
    }
}
