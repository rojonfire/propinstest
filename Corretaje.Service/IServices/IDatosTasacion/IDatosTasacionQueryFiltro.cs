using MongoDB.Driver;

namespace Corretaje.Service.IServices.IDatosTasacion
{
    public interface IDatosTasacionQueryFiltro<T>
    {
        FilterDefinition<T> FiltrarParaTasacion(
            Domain.Tasacion.TasacionPropiedad datosTasacion,
            double factorRangoInferiorSuperficieUtil,
            double factorRangoSuperiorSuperficieUtil,
            double factorRangoInferiorSuperficieTotal, 
            double factorRangoSuperiorSuperficieTotal
        );

        SortDefinition<T> SortByFechaCreacion();
    }
}