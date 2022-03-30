using Corretaje.Domain.Agenda;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IBloqueService.IBloqueBase
{
    public interface IBloqueService<T> where T : Bloque
    {
        Task<IEnumerable<T>> Add(IEnumerable<Bloque> bloque);

        Task<IEnumerable<T>> GetAll();

        Task<List<T>> Update(IEnumerable<Bloque> bloques);

        Task<T> Add(Bloque bloque);

        Task<T> Get(ObjectId id);

        Task<T> Update(Bloque bloque);

        void Delete(ObjectId id);
    }
}
