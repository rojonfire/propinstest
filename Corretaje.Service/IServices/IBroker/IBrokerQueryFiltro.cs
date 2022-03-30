using MongoDB.Driver;
namespace Corretaje.Service.IServices.IBroker
{
    public interface IBrokerQueryFiltro
    {
        FilterDefinition<Domain.Broker> FindByEmail(string email);
    }
}
