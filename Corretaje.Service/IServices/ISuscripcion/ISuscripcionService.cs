using Corretaje.Domain;
using MongoDB.Bson;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.ISuscripcion
{
    public interface ISuscripcionService
    {
        Task<IEnumerable<Suscripcion>> GetAll();

        Task<Domain.Suscripcion> Get(ObjectId id);

        Task<Page<Suscripcion>> GetAllPaginated(int pageSize, int page);

        Task<Suscripcion> Add(Suscripcion suscripcion);

        Task<Suscripcion> Update(Suscripcion suscripcion);

        Task<IEnumerable<Suscripcion>> UpdateRecomendaciones();

        Task<MemoryStream> Export(string filePath);

        Task<Domain.Suscripcion> GetLastUpdated();
    }
}
