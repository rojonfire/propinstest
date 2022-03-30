using Corretaje.Domain;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices
{
    public interface IAvalService
    {
        Task<Aval> Add(Aval aval);

        Task<Aval> Get(ObjectId id);

        Task<IEnumerable<Aval>> GetAll();

        Task<Aval> Update(Aval aval);

        void Delete(ObjectId id);
    }
}
