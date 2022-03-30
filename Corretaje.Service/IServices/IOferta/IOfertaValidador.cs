using Corretaje.Service.IServices.IValidador;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IOferta
{
    public interface IOfertaValidador<T>
    {
        Task<bool> EsValido(T oferta);

        List<IValidador<Domain.Oferta>> Validadores { get; }

        List<string> Errores { get; }
    }
}
