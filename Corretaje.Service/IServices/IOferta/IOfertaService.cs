using Corretaje.Domain;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IOferta
{
    public interface IOfertaService
    {
        /// <summary>
        /// Añade a la oferta un mensaje al final del listado de mensajes.
        /// </summary>
        /// <param name="ofertaId">Id de la oferta a la cual se agregará el mensaje</param>
        /// <param name="mensaje">Texto que pasará a formar parte del listado de mensajes</param>
        /// <returns>La oferta a la cual se agregó el mensaje</returns>
        Task<Oferta> AgregarMensajeAOferta(ObjectId ofertaId, MensajeOferta mensaje);

        /// <summary>
        /// Obtiene todas las ofertas cuyo estado es igual a vigente.
        /// </summary>
        /// <returns>Un listado de ofertas activas</returns>
        Task<IEnumerable<Oferta>> GetTodasLasOfertasVigentes();

        /// <summary>
        /// Obtiene una oferta según el id de la publicación.
        /// </summary>
        /// <param name="publicacionId">Id de la publicación</param>
        /// <returns>Una oferta</returns>
        Task<IEnumerable<Oferta>> GetOfertasByPublicacionId(string publicacionId);

        /// <summary>
        /// Agrega una oferta en la base de datos.
        /// </summary>
        /// <param name="oferta">Corresponde a la oferta que se va a agregar</param>
        /// <returns>La oferta que se agregó</returns>
        Task<Oferta> AgregarOferta(Oferta oferta);

        /// <summary>
        /// Actualiza una oferta en la base de datos.
        /// </summary>
        /// <param name="oferta">Corresponde a la oferta que se va a actualizar</param>
        /// <returns>La oferta que se agregó</returns>
        Task<Oferta> UpdateOferta(Oferta oferta);

        /// <summary>
        /// Obtiene una oferta según su id.
        /// </summary>
        /// <param name="ofertaId">Id de la oferta a obtener</param>
        /// <returns>Una oferta cuyo id coincide con el id suministrado como parámetro</returns>
        Task<Oferta> GetOfertaById(ObjectId ofertaId);

        /// <summary>
        /// Obtiene una oferta según el id de la oferta y el id del usuario que ofertó.
        /// </summary>
        /// <param name="ofertaId">Id de la oferta</param>
        /// <param name="ofertadorId">Id del usuario que ofertó</param>
        /// <returns>Una oferta</returns>
        Task<Oferta> GetOfertaByOfertaIdAndOfertadorId(ObjectId ofertaId, string ofertadorId);

        /// <summary>
        /// Obtiene una oferta según el id de la oferta y el id del propietario.
        /// </summary>
        /// <param name="ofertaId">Id de la oferta</param>
        /// <param name="propietarioId">Id del propietario</param>
        /// <returns>Una oferta</returns>
        Task<Oferta> GetOfertaByOfertaIdAndPropietarioId(ObjectId ofertaId, string propietarioId);

        /// <summary>
        /// Actualiza el estado de la oferta modificando la propiedad Estado a "Aceptada".
        /// </summary>
        /// <param name="ofertaId">Id de la oferta para aceptar</param>
        /// <returns>La oferta aceptada</returns>
        Task<Oferta> AceptarOferta(ObjectId ofertaId);

        Task<Oferta> SetOfertaEstadoContratoBorrador(ObjectId ofertaId);

        Task<Oferta> SetOfertaEstadoContratoFinalizado(ObjectId ofertaId);

        /// <summary>
        /// Actualiza el estado de la oferta modificando la propiedad Estado a "Declinada".
        /// </summary>
        /// <param name="ofertaId">Id de la oferta para declinar</param>
        /// <returns>La oferta declinada</returns>
        Task<Oferta> DeclinarOferta(ObjectId ofertaId);

        /// <summary>
        /// Actualiza el estado de la oferta modificando la propiedad Estado a "Rechazada".
        /// </summary>
        /// <param name="ofertaId">Id de la oferta para rechazar</param>
        /// <returns>La oferta rechazada</returns>
        Task<Oferta> RechazarOferta(ObjectId ofertaId, Estados.OfertaEmision emitidaPor);

        /// <summary>
        /// Obtienes las ofertas by ofertador id.
        /// </summary>
        /// <param name="ofertadorId">Id de quien realiza la oferta</param>
        /// <returns>La oferta rechazada</returns>
        Task<IEnumerable<Oferta>> GetOfertasByOfertador(string ofertadorId);

        void EliminarOferta(ObjectId ofertaId);

        /// <summary>
        /// Elimina las ofertas que tengas más de {ofertaConfiguracion.OfertaVigencia} horas de emisión
        /// Se ejecuta como proceso background
        /// </summary>
        void EliminarOfertasCaducadas();

        void DeclinarOfertasCaducadas();

        void OfertaSendEMailOfertaAceptadaComprador(Oferta oferta, string html);

        void OfertaSendEMailOfertaAceptadaVendedor(Oferta oferta, string html);

        void OfertaSendEMailOfertaDeclinadaComprador(Oferta oferta, string html);

        void OfertaSendEMailOfertaDeclinadaVendedor(Oferta oferta, string html);

        void OfertaSendEMailOfertaRechazadaComprador(Oferta oferta, string html);

        void OfertaSendEMailOfertaRechazadaVendedor(Oferta oferta, string html);

        void OfertaSendEmailOfertaEmitidaVendedor(Oferta oferta, string html);

        void OfertaSendEmailOfertaEmitidaComprador(Domain.Oferta oferta, string html);

        void OfertaSendEmailOfertaEmitidaCopiaAdministrador(string html);

        /// <summary>
        /// Obtiene un array de oferta filtradas por el propietario Id.
        /// </summary>
        /// <returns>Una colección de ofertas</returns>
        Task<IEnumerable<Oferta>> GetOfertaByPropietarioId(string propietarioId);

        /// <summary>
        /// Obtiene una colección de oferta vigentes filtradas por el propietario Id.
        /// </summary>
        /// <returns>Una colección de ofertas</returns>
        Task<IEnumerable<Oferta>> GetOfertasVigentesByPropietarioId(string propietarioId);
    }
}
