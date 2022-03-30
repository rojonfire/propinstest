using Corretaje.Service.IServices.IOferta;
using Corretaje.Service.IServices.IValidador;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Oferta
{
    public abstract class OfertaValidador : IOfertaValidador<Domain.Oferta>
    {
        public List<IValidador<Domain.Oferta>> Validadores { get; set; }

        public List<string> Errores { get; set; }

        public OfertaValidador(List<IValidador<Domain.Oferta>> validadores)
        {
            Validadores = validadores;
            Errores = new List<string>();
        }

        public async Task<bool> EsValido(Domain.Oferta oferta)
        {
            bool resultado = true;

            foreach (var validador in Validadores)
            {
                if (!await validador.EsValido(oferta))
                {
                    resultado = false;

                    Errores.AddRange(validador.Errores(oferta));
                }
            }

            return resultado;
        }
    }
}
