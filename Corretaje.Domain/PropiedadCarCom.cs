
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    public class PropiedadCarCom
    {
        [BsonElement("AccesoControlado")]
        public bool AccesoControlado { get; set; }
        [BsonElement("EstVisita")]
        public bool EstVisita { get; set; }
        
        [BsonElement("PortonElec")]
        public bool PortonElec { get; set; }
        [BsonElement("SalonDeJuegos")]
        public bool SalonDeJuegos { get; set; }
        [BsonElement("AreasVerdes")]
        public bool AreasVerdes { get; set; }
        
        [BsonElement("Quincho")]
        public bool Quincho { get; set; }
        [BsonElement("Sauna")]
        public bool Sauna { get; set; }
        [BsonElement("CamaraSeguridad")]
        public bool CamaraSeguridad { get; set; }
        
        [BsonElement("Bicicletros")]
        public bool Bicicletros { get; set; }
        [BsonElement("SalaDeCine")]
        public bool SalaDeCine { get; set; }
        [BsonElement("Citofono")]
        public bool Citofono { get; set; }
        [BsonElement("JuegosInf")]
        public bool JuegosInf { get; set; }
        [BsonElement("Piscina")]
        public bool Piscina { get; set; }
        [BsonElement("SalaDeEventos")]
        public bool SalaDeEventos { get; set; }
    }
}
