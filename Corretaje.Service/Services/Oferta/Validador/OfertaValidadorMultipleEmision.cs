using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices.IValidador;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Oferta.Validador
{
    public class OfertaValidadorMultipleEmision : IValidador<Domain.Oferta>
    {
        private readonly IRepository<Domain.Oferta> _repositoryOferta;

        public OfertaValidadorMultipleEmision(IRepository<Domain.Oferta> repositoryOferta)
        {
            _repositoryOferta = repositoryOferta;
        }

        public IEnumerable<string> Errores(Domain.Oferta Entity)
        {
            return new List<string>() { "Ud ya tiene una oferta en curso, debe esperar a recibir una respuesta para re-ofertar" };
        }

        public async Task<bool> EsValido(Domain.Oferta ofertaAgregar)
        {
            var respuestaBd = await _repositoryOferta.Get(ofertaAgregar.Id);

            return (respuestaBd.Estado == Estados.Oferta.Null && ofertaAgregar.EmitidaPor == Estados.OfertaEmision.Usuario);
        }
    }
}
