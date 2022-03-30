using Corretaje.Domain;
using Corretaje.Service.IServices.IOferta;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Globalization;

namespace Corretaje.Service.Services.Oferta
{
    public class OfertaQueryFiltro : IOfertaQueryFiltro
    {
        private readonly IOfertaConfiguration _ofertaConfiguracion;

        private DateTime FechaCaducidad => DateTime.Now.AddHours(_ofertaConfiguracion.OfertaVigencia * -1);

        public OfertaQueryFiltro(IOfertaConfiguration ofertaConfiguration)
        {
            _ofertaConfiguracion = ofertaConfiguration;
        }

        public FilterDefinition<Domain.Oferta> FiltroOfertaByOfertaIdAndOfertadorId(ObjectId ofertaId, string ofertadorId)
        {
            return Builders<Domain.Oferta>.Filter.Where(oferta => oferta.Id == ofertaId && oferta.OfertadorId == ofertadorId);
        }

        public FilterDefinition<Domain.Oferta> FiltroOfertaByOfertaIdAndPropietarioId(ObjectId ofertaId, string propietarioId)
        {
            return Builders<Domain.Oferta>.Filter.Where(oferta => oferta.Id == ofertaId && oferta.PropietarioId == propietarioId);
        }

        public FilterDefinition<Domain.Oferta> FiltroOfertaByPublicacionId(string publicacionId)
        {
            return Builders<Domain.Oferta>.Filter.Where(oferta => oferta.PublicacionId == publicacionId);
        }

        public FilterDefinition<Domain.Oferta> FiltroOfertasParaDeclinarByPublicacionId(string publicacionId)
        {
            return Builders<Domain.Oferta>.Filter.Where(oferta => oferta.Estado != Estados.Oferta.Declinada && oferta.Estado != Estados.Oferta.Aceptada);
        }

        public FilterDefinition<Domain.Oferta> FiltroOfertasVigentes()
        {
            return Builders<Domain.Oferta>.Filter.Where(oferta => oferta.Estado != Estados.Oferta.Declinada);
        }

        public FilterDefinition<Domain.Oferta> FiltroOfertasByPropietarioId(string propietarioId)
        {
            return Builders<Domain.Oferta>.Filter.Where(oferta => oferta.PropietarioId == propietarioId);
        }

        public FilterDefinition<Domain.Oferta> FiltroOfertasParaEliminar()
        {
            return Builders<Domain.Oferta>.Filter.Where(oferta => oferta.Estado != Estados.Oferta.Declinada && oferta.CreatedAt > FechaCaducidad);
        }

        public FilterDefinition<Domain.Oferta> FiltroOfertasVigentesByPropietarioId(string propietarioId)
        {
            return Builders<Domain.Oferta>.Filter.Where(oferta => oferta.Estado != Estados.Oferta.Declinada && oferta.PropietarioId == propietarioId);
        }

        public FilterDefinition<Domain.Oferta> FiltroOfertasByOfertadorId(string ofertadorId)
        {
            return Builders<Domain.Oferta>.Filter.Where(oferta => oferta.OfertadorId == ofertadorId);
        }

        public FilterDefinition<Domain.Oferta> FiltroOfertasByOfertadorIdAndPublicacionId(string ofertadorId, string publicacionId)
        {
            return Builders<Domain.Oferta>.Filter.Where(oferta => oferta.OfertadorId == ofertadorId && oferta.PublicacionId == publicacionId);
        }

        public FilterDefinition<Domain.Oferta> FiltroOfertasCaducadas()
        {
            return Builders<Domain.Oferta>.Filter.Where(oferta => oferta.FechaVencimiento > DateTime.Now && (oferta.Estado == Estados.Oferta.Rechazada || oferta.Estado == Estados.Oferta.Null));
        }
    }
}
