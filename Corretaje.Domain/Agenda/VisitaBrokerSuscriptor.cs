using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain.Agenda
{
    public class VisitaBrokerSuscriptor : Visita
    {
        [BsonElement("IdBroker")]
        public string IdBroker { get; set; }
        
        [BsonElement("IdSuscripcion")]
        public string IdSuscripcion { get; set; }

        [BsonElement("PropiedadDireccion")]
        public string PropiedadDireccion { get; set; }
    }
}