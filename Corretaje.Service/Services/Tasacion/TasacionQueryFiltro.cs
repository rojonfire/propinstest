using Corretaje.Service.IServices.ITasacion;
using MongoDB.Driver;

namespace Corretaje.Service.Services.Tasacion
{
    public class TasacionQueryFiltro : ITasacionQueryFiltro
    {
        /*
        public SortDefinition<Domain.Tasacion.TasacionResult> NumeroSolicitudMayor()
        {
            return Builders<Domain.Tasacion.TasacionResult>.Sort.Descending("NumeroSolicitud");
        }
        public FilterDefinition<Domain.Tasacion.TasacionResult> GetTasacionesByUsuarioId(string usuarioId)
        {
            return Builders<Domain.Tasacion.TasacionResult>.Filter.Where(t => t.IdUser == usuarioId);
        }
        public FindOptions<Domain.Tasacion.TasacionResult, Domain.Tasacion.TasacionResult> FindByUltimoNumeroSolicitud()
        {
            return new FindOptions<Domain.Tasacion.TasacionResult, Domain.Tasacion.TasacionResult>
            {
                Limit = 1,
                Sort = Builders<Domain.Tasacion.TasacionResult>.Sort.Descending(o => o.NumeroSolicitud)
            };
        }
        */
        public FilterDefinition<Domain.Tasacion.TasacionResult> FiltroVacio()
        {
            return Builders<Domain.Tasacion.TasacionResult>.Filter.Empty;
        }

        public FilterDefinition<Domain.Tasacion.TasacionResult> FindByPropiedadId(string idPropiedad)
        {
            return Builders<Domain.Tasacion.TasacionResult>.Filter.Where(t => t.IdPropiedad == idPropiedad);
        }
    }
}
