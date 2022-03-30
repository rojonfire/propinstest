using Corretaje.Domain.Tasacion;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.ITasacion
{
    public interface ITasacionService
    {
        Task<IEnumerable<TasacionResult>> GetAll();

        //Task<int> GenerarNumeroSolicitud();

        Task<TasacionResult> Add(TasacionResult tasacion);

        Task<TasacionResult> Get(ObjectId id);

        Task<TasacionResult> Update(TasacionResult tasacion);

        //Task<IEnumerable<TasacionResult>> GetForQuery(string idUser);

        void Delete(ObjectId id);

        Task<TasacionResult> GetTasacionPropiedad(IEnumerable<DatosTasacion> datosTasacion, TasacionPropiedad tasacionPropiedad);

        Task<Domain.Tasacion.TasacionResult> GetByPropiedadId(string IdPropiedad);
    }
}
