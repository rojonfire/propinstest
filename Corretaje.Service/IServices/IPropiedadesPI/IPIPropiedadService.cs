using Corretaje.Domain.PropiedadesPI;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IPropiedadesPI
{
    public interface IPIPropiedadService<T> where T : PIPropiedad
    {
        Task<T> Add(T PropiedadPI);

        //Task<IEnumerable<PIPropiedad>> UploadFile(string fileLocation);

        Task<IEnumerable<T>> AddMany(IEnumerable<T> propiedades);

        Task<IEnumerable<T>> BuscarCoincidencias(Domain.Suscripcion suscripcion);
    }
}
