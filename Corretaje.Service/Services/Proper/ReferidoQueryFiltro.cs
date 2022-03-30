using Corretaje.Domain;
using Corretaje.Service.IServices.IProper;
using MongoDB.Driver;

namespace Corretaje.Service.Services.Proper
{
    public class ReferidoQueryFiltro : IReferidoQueryFiltro
    {
        public FilterDefinition<Referidos> FindByEmail(string mail)
        {
            return Builders<Referidos>.Filter.Where(refe => refe.Mail == mail);
        }
    }
}