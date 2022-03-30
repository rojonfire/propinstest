using Corretaje.Service.IServices.IValidador;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Oferta.Validador
{
    public class OfertaValidadorOfertadorDistintoPropietario : IValidador<Domain.Oferta>
    {
        public IEnumerable<string> Errores(Domain.Oferta entity)
        {
            return new List<string>() { "Ud no puede oferta su propia propiedad" };
        }

        public Task<bool> EsValido(Domain.Oferta entity)
        {
            return Task.FromResult(entity.OfertadorRut != entity.OferenteRut);
        }
    }
}
