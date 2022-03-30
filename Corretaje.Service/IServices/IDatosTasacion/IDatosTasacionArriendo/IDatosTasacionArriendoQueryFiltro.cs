using MongoDB.Driver;

namespace Corretaje.Service.IServices.IDatosTasacion.IDatosTasacionArriendo
{
    public interface IDatosTasacionArriendoQueryFiltro
    {
        FilterDefinition<Domain.Tasacion.DatosTasacionArriendo> FiltrarParaTasacion(Domain.Tasacion.TasacionPropiedad datosTasacion, double factorRangoInferiorSuperficieTotal, double factorRangoSuperiorSuperficieTotal);

        SortDefinition<Domain.Tasacion.DatosTasacionArriendo> SortByFechaCreacion();
    }
}
