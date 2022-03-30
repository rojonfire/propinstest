using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services
{
    public class AvalService : IAvalService
    {
        private readonly IRepository<Aval> _repositoryAval;

        public AvalService(IRepository<Aval> repositoryAval)
        {
            _repositoryAval = repositoryAval;
        }

        public async Task<Aval> Add(Aval aval)
        {
            return await _repositoryAval.Insert(aval);
        }

        public async Task<Aval> Get(ObjectId id)
        {
            return await _repositoryAval.Get(id);
        }

        public async Task<IEnumerable<Aval>> GetAll()
        {
            return await _repositoryAval.GetAll();
        }

        public async Task<Aval> Update(Aval aval)
        {
            return await _repositoryAval.Update(aval);
        }

        public void Delete(ObjectId id)
        {
            _repositoryAval.Delete(id);
        }
    }
}
