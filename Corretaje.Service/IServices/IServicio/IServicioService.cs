using Corretaje.Domain;
using Corretaje.Repository;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IServicio
{
    public interface IServicioService<T> where T : IEntity
    {
        Task<T> AgregarServicio(T servicio);

        Task<IEnumerable<T>> AgregarServicios(IEnumerable<T> servicios);

        Task<IEnumerable<T>> GetServiciosAdicionalesById(IEnumerable<ObjectId> serviciosAdicionalesId);

        Task<IEnumerable<T>> GetTodosLosServicios();

        Task<T> GetServicioById(ObjectId servicioId);

        Task<T> UpdateServicio(T servicio);

        Task<ResultadoDelProceso> DeleteServicio(ObjectId servicioId);
    }
}
