using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    public class RecuperarCuenta : Entity
    {
        [BsonElement("Estado")]
        public Estados.RecuperarCuenta Estado { get; set; }

        [BsonElement("UsuarioEmail")]
        public string UsuarioEmail { get; set; }

        [BsonElement("Link")]
        public string Link { get; set; }

        [BsonElement("Guid")]
        public string Guid { get; set; }
    }
}
