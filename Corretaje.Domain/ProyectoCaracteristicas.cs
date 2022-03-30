using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    public class ProyectoCaracteristicas
    {
        [BsonElement("Calefaccion")]
        public string  Calefaccion { get; set; }        
        
        [BsonElement("Alarma")]
        public bool Alarma { get; set; }        
        
        [BsonElement("CocinaAmo")]
        public bool CocinaAmo { get; set; }

        [BsonElement("TipoPiso")]
        public string TipoPiso { get; set; }

        [BsonElement("Termopanel")]
        public bool Termopanel { get; set; }
    }
}
