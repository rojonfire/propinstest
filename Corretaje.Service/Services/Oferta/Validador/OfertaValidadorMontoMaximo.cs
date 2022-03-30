using Corretaje.Service.IServices.IValidador;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Oferta.Validador
{
    public class OfertaValidadorMontoMaximo : IValidador<Domain.Oferta>
    {
        public IEnumerable<string> Errores(Domain.Oferta oferta)
        {
            return new List<string>() { "Su oferta no debe ser superior al monto de la publicación" };
        }

        public Task<bool> EsValido(Domain.Oferta oferta)
        {
            return Task.FromResult(oferta.MontoDeOferta <= oferta.MontoDePublicacion);
        }
    }
}
