using Corretaje.Domain;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.ILandingInmobiliaria
{
    public interface ILandingInmobiliariaService
    {
        Task<LandingInmobiliaria> Add(LandingInmobiliaria suscripcion);

        Task<IEnumerable<LandingInmobiliaria>> GetAll();

        Task<Page<LandingInmobiliaria>> GetAllPaginated(int pageSize, int page);

        Task<LandingInmobiliaria> Get(ObjectId id);

        Task<LandingInmobiliaria> GetByPathname(string pathname);

        Task<LandingInmobiliaria> Update(LandingInmobiliaria landingInmobiliaria);
    }
}
