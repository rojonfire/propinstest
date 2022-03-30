using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    public class PropiedadCaracteristicas
    {
        
        [BsonElement("SalaDeEstar")]
        public bool SalaDeEstar { get; set; }
       
        
        
        [BsonElement("Calefaccion")]
        public string  Calefaccion { get; set; }
        
        
        [BsonElement("Alarma")]
        public bool Alarma { get; set; }
        [BsonElement("Escritorio")]
        public bool Escritorio { get; set; }
        
        [BsonElement("Logia")]
        public bool Logia { get; set; }
        [BsonElement("PortonAut")]
        public bool PortonAut { get; set; }
        
        [BsonElement("CocinaAmo")]
        public bool CocinaAmo { get; set; }
        
    }
}
