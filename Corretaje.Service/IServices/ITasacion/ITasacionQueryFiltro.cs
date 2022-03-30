using MongoDB.Driver;

namespace Corretaje.Service.IServices.ITasacion
{
    public interface ITasacionQueryFiltro
    {
        //SortDefinition<Domain.Tasacion.TasacionResult> NumeroSolicitudMayor();

       // FilterDefinition<Domain.Tasacion.TasacionResult> GetTasacionesByUsuarioId(string usuarioId);

        FilterDefinition<Domain.Tasacion.TasacionResult> FiltroVacio();

        //FindOptions<Domain.Tasacion.TasacionResult, Domain.Tasacion.TasacionResult> FindByUltimoNumeroSolicitud();

        FilterDefinition<Domain.Tasacion.TasacionResult> FindByPropiedadId(string idPropiedad);
    }
}
