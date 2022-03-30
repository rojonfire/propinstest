using Corretaje.Domain;
using Corretaje.Service.IServices.IProper;
using MongoDB.Driver;

namespace Corretaje.Service.Services.Proper
{
    public class ProperQueryFiltro : IProperQueryFiltro
    {
        public FilterDefinition<Propers> FindByEmail(string email)
        {
            return Builders<Propers>.Filter.Where(proper => proper.Email == email);
        }

        public FilterDefinition<Propers> FindByLogin(string password, string email)
        {
            return Builders<Propers>.Filter.Where(proper => proper.Email == email && proper.Password == password);
        }
    }
}