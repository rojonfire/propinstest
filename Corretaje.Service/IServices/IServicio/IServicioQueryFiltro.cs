using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;

namespace Corretaje.Service.IServices.IServicio
{
    public interface IServicioQueryFiltro<T>
    {
        FilterDefinition<T> FindServiciosAdicionalesById(IEnumerable<ObjectId> serviciosAdicionalesId);
    }
}
