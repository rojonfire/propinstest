using Corretaje.Domain;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IProper
{
    public interface IProperQueryFiltro
    {
        FilterDefinition<Propers> FindByEmail(string email);

        FilterDefinition<Propers> FindByLogin(string password, string email);
    }
}