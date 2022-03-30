using Corretaje.Repository;
using Corretaje.Service.IServices.IServicio;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace Corretaje.Service.Services.Servicio
{
    public class ServicioQueryFiltro<T> : IServicioQueryFiltro<T> where T : Entity
    {
        public FilterDefinition<T> FindServiciosAdicionalesById(IEnumerable<ObjectId> serviciosAdicionalesId)
        {
            return Builders<T>.Filter.Where(servicio => serviciosAdicionalesId.Contains(servicio.Id));
        }
    }
}
