using MongoDB.Driver;

namespace Corretaje.Service.IServices.IDatosTasacion.IDatosTasacionVenta
{
    public interface IDatosTasacionVentaQueryFiltro
    {
        FilterDefinition<Domain.Tasacion.DatosTasacionVenta> FiltrarParaTasacion(Domain.Tasacion.TasacionPropiedad datosTasacion, double factorRangoInferiorSuperficieTotal, double factorRangoSuperiorSuperficieTotal);

        SortDefinition<Domain.Tasacion.DatosTasacionVenta> SortByFechaCreacion();
    }
}
