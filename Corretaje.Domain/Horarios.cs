using MongoDB.Bson.Serialization.Attributes;
using Corretaje.Repository;
using System.Collections.Generic;

namespace Corretaje.Domain
{
    public class Horario : Entity
    {
        
        [BsonElement("IdUsuario")]
        public string IdUsuario { get; set; }
        [BsonElement("Nombre")]
        public string Nombre { get; set; }
        [BsonElement("Rol")]
        public string Rol { get; set; }
        [BsonElement("Events")]
        public List<Evento> Events { get; set; }


    }
}
