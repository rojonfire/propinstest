using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain.Agenda
{
    public class BloqueCliente : Bloque
    {
        [BsonElement("ClienteId")]
        public string ClienteId { get; set; }

        [BsonElement("PropiedadId")]
        public string PropiedadId { get; set; }
    }
}
