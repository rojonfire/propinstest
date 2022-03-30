using System.Collections.Generic;
using System.Threading.Tasks;
using Corretaje.Domain;
using Corretaje.Repository;

namespace Corretaje.Service.IServices.ITarjetaProp
{
    public interface ITarjetaPropService : IRepository<TarjetaProp>
    {
        Task<IEnumerable<TarjetaProp>> Buscar(Busqueda parametrosBusqueda);

        Task<TarjetaProp> Add(TarjetaProp tarjetaProp);

        Task<Domain.TarjetaProp> GetByCodigoPropiedad(string codigoPropiedad);
    }
}