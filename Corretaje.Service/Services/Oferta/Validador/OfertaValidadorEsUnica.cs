using Corretaje.Common.Extension;
using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices.IOferta;
using Corretaje.Service.IServices.IValidador;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Oferta.Validador
{
    public class OfertaValidadorEsUnica : IValidador<Domain.Oferta>
    {
        private readonly IOfertaQueryFiltro OfertaQueryFiltro;
        private readonly IRepository<Domain.Oferta> Repository;

        public OfertaValidadorEsUnica(IOfertaQueryFiltro ofertaQueryFiltro, IRepository<Domain.Oferta> repository)
        {
            OfertaQueryFiltro = ofertaQueryFiltro;
            Repository = repository;
        }

        public IEnumerable<string> Errores(Domain.Oferta oferta)
        {
            return new List<string>() { "No puede ofertar la propiedad mientras exista una oferta pendiente" };
        }

        public async Task<bool> EsValido(Domain.Oferta ofertaParaAgregar)
        {
            var respuestaBaseDeDatos = await Repository.SearchFor(OfertaQueryFiltro.FiltroOfertaByPublicacionId(ofertaParaAgregar.PublicacionId));

            if (respuestaBaseDeDatos.IsNullOrEmpty())
            {
                return true;
            }

            var ofertas = respuestaBaseDeDatos.Where(oferta => oferta.Estado == Estados.Oferta.Null || oferta.Estado == Estados.Oferta.Rechazada);

            if (ofertas.IsNullOrEmpty())
            {
                return true;
            }

            if (ofertas.Any(oferta => oferta.Estado == Estados.Oferta.Null))
            {
                return false;
            }

            return ofertas.Any(oferta => oferta.OfertadorId == ofertaParaAgregar.OfertadorId);
        }
    }
}
