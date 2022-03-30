using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    public class ValoracionUsuario : Entity
    {
        [BsonElement("Nota")]
        public int Nota { get; set; }

        [BsonElement("Descripcion")]
        public string Descripcion { get; set; }

        [BsonElement("Nombre")]
        public string Nombre { get; set; }

        [BsonElement("Ubicacion")]
        public string Ubicacion { get; set; }
    }
}
