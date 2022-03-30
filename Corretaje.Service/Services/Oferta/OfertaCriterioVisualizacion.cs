using Corretaje.Service.IServices.IOferta;
using System.Collections.Generic;
using System.Linq;

namespace Corretaje.Service.Services.Oferta
{
    public class OfertaCriterioVisualizacion : IOfertaCriterioVisualizacion
    {
        public IEnumerable<Domain.Oferta> GetOfertasOrdenadasByPrecioFechaPublicacion(IEnumerable<Domain.Oferta> ofertas)
        {
            return ofertas.OrderByDescending(oferta => oferta.MontoDeOferta).ThenByDescending(oferta => oferta.CreatedAt);
        }
    }
}
