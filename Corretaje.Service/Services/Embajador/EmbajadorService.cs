using Corretaje.Repository;
using Corretaje.Service.IServices.IEmbajador;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Embajador
{
    public class EmbajadorService : IEmbajadorService
    {
        public IRepository<Domain.Embajador> _embajadorRepository;

        public EmbajadorService(IRepository<Domain.Embajador> embajadorRepository)
        {
            _embajadorRepository = embajadorRepository;
        }

        public async Task<Domain.Embajador> Get(ObjectId id)
        {
            return await _embajadorRepository.Get(id);
        }

        public async Task<Domain.Embajador> Add(Domain.Embajador embajador)
        {
            return await _embajadorRepository.Insert(embajador);
        }
    }
}
