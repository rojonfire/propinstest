using Corretaje.Domain;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IOferta
{
    public interface IOfertaQueryFiltro
    {
        FilterDefinition<Oferta> FiltroOfertaByOfertaIdAndOfertadorId(ObjectId ofertaId, string ofertadorId);

        FilterDefinition<Oferta> FiltroOfertaByOfertaIdAndPropietarioId(ObjectId ofertaId, string propietarioId);

        FilterDefinition<Oferta> FiltroOfertaByPublicacionId(string publicacionId);

        FilterDefinition<Oferta> FiltroOfertasByPropietarioId(string propietarioId);

        FilterDefinition<Oferta> FiltroOfertasParaDeclinarByPublicacionId(string publicacionId);

        FilterDefinition<Oferta> FiltroOfertasByOfertadorId(string ofertadorId);

        FilterDefinition<Oferta> FiltroOfertasByOfertadorIdAndPublicacionId(string ofertadorId, string publicacionId);

        FilterDefinition<Oferta> FiltroOfertasParaEliminar();

        FilterDefinition<Oferta> FiltroOfertasVigentes();

        FilterDefinition<Oferta> FiltroOfertasVigentesByPropietarioId(string propietarioId);

        FilterDefinition<Oferta> FiltroOfertasCaducadas();
    }
}
