using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    [BsonIgnoreExtraElements]
    public class ServicioBase : Entity
    {
        [BsonElement("Nombre")]
        public string Nombre { get; set; }
    }
}
