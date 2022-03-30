using Corretaje.Service.IServices.IValidador;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Oferta.Validador
{
    public class OfertaValidadorCotaInferior : IValidador<Domain.Oferta>
    {
        public IEnumerable<string> Errores(Domain.Oferta entity)
        {
            return new List<string>() { "La nueva oferta debe tener un monto mayor a las ofertas que ud ha realizado con anterioridad para esta propiedad" };
        }

        public Task<bool> EsValido(Domain.Oferta ofertaActualizar)
        {
            return Task.FromResult(ofertaActualizar.MontoDeOferta > ofertaActualizar.MontoMinimo);
        }
    }
}
