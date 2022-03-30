using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain.Agenda
{
    public abstract class Bloque : Entity
    {
        [BsonElement("Dia")]
        public Estados.Semana Dia { get; set; }
        
        [BsonElement("Tramo")]
        public string Tramo { get; set; }
    }
}
