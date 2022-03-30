using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    public class Anfitrion : Entity
    {
        [BsonElement("Nombre")]
        public string Nombre { get; set; }

        [BsonElement("Rut")]
        public string Rut { get; set; }
    }
}
