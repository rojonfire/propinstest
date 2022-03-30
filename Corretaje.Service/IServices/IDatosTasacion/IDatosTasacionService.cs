using Corretaje.Domain;
using Corretaje.Domain.Tasacion;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IDatosTasacion
{
    public interface IDatosTasacionService<T> where T : DatosTasacion
    {
        Task<IEnumerable<T>> GetAll();

        Task<IEnumerable<T>> FiltrarTasacion(TasacionPropiedad datosTasacion);

        Task<ValoresPreliminaresTasacion> ObtenerValoresPreliminares(TasacionPropiedad datosTasacion);

        Task<Page<T>> GetPropiedadesSimilares(TasacionPropiedad datosTasacion, int pageSize, int page);

        Task<IEnumerable<T>> GetPropiedadesSimilares(TasacionPropiedad datosTasacion);

        Task<T> Add(T datosTasacion);

        //Task<IEnumerable<T>> UploadFile(string fileLocation);

        Task<IEnumerable<T>> AddMany(IEnumerable<T> datosTasacionList);

        void DeleteAll();

        void Delete(ObjectId objectId);
    }
}
