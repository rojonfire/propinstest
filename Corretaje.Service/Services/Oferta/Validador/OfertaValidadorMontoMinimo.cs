using System.Collections.Generic;
using System.Threading.Tasks;
using Corretaje.Service.IServices.IOferta;
using Corretaje.Service.IServices.IValidador;

namespace Corretaje.Service.Services.Oferta.Validador
{
    public class OfertaValidadorMontoMinimo : IValidador<Domain.Oferta>
    {
        private readonly IOfertaConfiguration OfertaConfiguracion;

        public OfertaValidadorMontoMinimo(IOfertaConfiguration ofertaConfiguracion)
        {
            OfertaConfiguracion = ofertaConfiguracion;
        }

        public IEnumerable<string> Errores(Domain.Oferta Entity)
        {
            return new List<string>() { "Su oferta no supera el monto mínimo de oferta" };
        }

        public Task<bool> EsValido(Domain.Oferta oferta)
        {
            var novetaPorcientoMontoPublicacion = oferta.MontoDePublicacion * (OfertaConfiguracion.OfertaPorcentajeMinimo / 100);

            return Task.FromResult(novetaPorcientoMontoPublicacion <= oferta.MontoDeOferta);
        }
    }
}
