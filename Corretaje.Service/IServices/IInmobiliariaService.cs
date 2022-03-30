
using System.Threading.Tasks;
using Corretaje.Domain;
using MongoDB.Bson;

namespace Corretaje.Service.IServices
{
    public interface IInmobiliariaService
    {
        Task<Inmobiliaria> Update(Inmobiliaria inmobiliaria, Inmobiliaria update);

        Task<Inmobiliaria> GetById(ObjectId id);

        string AddLink(string inmobiliariaId);
    }
}
