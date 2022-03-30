using Corretaje.Service.IServices.IBroker;
using MongoDB.Driver;

namespace Corretaje.Service.Services.Broker
{
    public class BrokerQueryFiltro : IBrokerQueryFiltro
    {
        public FilterDefinition<Domain.Broker> FindByEmail(string email)
        {
            return Builders<Domain.Broker>.Filter.Where(broker => broker.Email.ToLower() == email.ToLower());
        }
    }
}
