using Corretaje.Service.IServices.IOferta;
using Corretaje.Service.IServices.IValidador;
using System.Collections.Generic;

namespace Corretaje.Service.Services.Oferta
{
    public class OfertaValidadorAgregar : OfertaValidador, IOfertaValidadorAgregar<Domain.Oferta>
    {
        public OfertaValidadorAgregar(List<IValidador<Domain.Oferta>> validadores) : base(validadores)
        {

        }
    }
}
