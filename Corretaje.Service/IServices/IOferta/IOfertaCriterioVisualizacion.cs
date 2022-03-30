using System.Collections.Generic;

namespace Corretaje.Service.IServices.IOferta
{
    public interface IOfertaCriterioVisualizacion
    {
        IEnumerable<Domain.Oferta> GetOfertasOrdenadasByPrecioFechaPublicacion(IEnumerable<Domain.Oferta> ofertas);
    }
}
