using Corretaje.Service.IServices.IOferta;
using Corretaje.Service.IServices.IValidador;
using System.Collections.Generic;

namespace Corretaje.Service.Services.Oferta
{
    public class OfertaValidadorActualizar : OfertaValidador, IOfertaValidadorActualizar<Domain.Oferta>
    {
        public OfertaValidadorActualizar(List<IValidador<Domain.Oferta>> validadores) : base(validadores)
        {

        }
    }
}
