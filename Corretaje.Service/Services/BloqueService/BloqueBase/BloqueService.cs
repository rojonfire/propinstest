using Corretaje.Domain.Agenda;
using Corretaje.Repository;
using Corretaje.Service.IServices.IBloqueService.IBloqueBase;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.BloqueService.BloqueBase
{
    public abstract class BloqueService<T> : IBloqueService<T> where T : Bloque
    {
        protected readonly IRepository<T> _repository;

        public BloqueService(IRepository<T> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<IEnumerable<T>> Add(IEnumerable<Bloque> bloques)
        {
            var bloquesAgregados = new List<T>();

            foreach (var bloque in bloques)
            {
                bloquesAgregados.Add(await Add(bloque));
            }

            return bloquesAgregados;
        }

        public async Task<T> Add(Bloque bloque)
        {
            return await _repository.Insert((T)bloque);
        }

        public async Task<T> Get(ObjectId id)
        {
            return await _repository.Get(id);
        }

        public async Task<T> Update(Bloque bloque)
        {
            return await _repository.Update((T)bloque);
        }

        public async Task<List<T>> Update(IEnumerable<Bloque> bloques)
        {
            var bloquesActualizados = new List<T>();

            foreach (var bloque in bloques)
            {
                bloquesActualizados.Add(await _repository.Update((T)bloque));
            }

            return bloquesActualizados;
        }

        public async void Delete(ObjectId id)
        {
            await _repository.Delete(id);
        }
    }
}
