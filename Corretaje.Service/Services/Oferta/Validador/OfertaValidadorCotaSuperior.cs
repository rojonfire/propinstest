using Corretaje.Service.IServices.IValidador;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Oferta.Validador
{
    public class OfertaValidadorCotaSuperior : IValidador<Domain.Oferta>
    {
        public IEnumerable<string> Errores(Domain.Oferta Entity)
        {
            return new List<string>() { "La nueva oferta debe tener un monto menor o igual al monto de la contraoferta" };
        }

        public Task<bool> EsValido(Domain.Oferta ofertaActualizar)
        {
            return Task.FromResult(ofertaActualizar.MontoDeOferta <= ofertaActualizar.MontoMaximo);
        }
    }
}
