using System.Threading.Tasks;
using Corretaje.Domain;
using MongoDB.Bson;

namespace Corretaje.Service.IServices.IProper
{
    public interface IReferidoService
    {
        Task<ReferidoProper> AddReferido(ReferidoProper referidoProper);

        Task<Referidos> Get(ObjectId referidoId);

       Task<Referidos> GetByEmail(string mail);

       Task<Referidos> Update(Referidos referidos);
    }
}