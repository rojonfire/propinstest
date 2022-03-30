using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Corretaje.Domain
{
    public class Ticket : Entity
    {
        [BsonElement("FechaDeRespuesta")]
        public DateTime? FechaDeRespuesta { get; set; }

        [BsonElement("AdministradorId")]
        public string AdministradorId { get; set; }
        
        [BsonElement("Nombre")]
        public string Nombre { get; set; }
        
        [BsonElement("Apellido")]
        public string Apellido { get; set; }

        [BsonElement("Asunto")]
        public string Asunto { get; set; }

        [BsonElement("EMail")]
        public string EMail { get; set; }
        
        [BsonElement("Empresa")]
        public string Empresa { get; set; }

        [BsonElement("Estado")]
        public string Estado { get; set; }

        [BsonElement("Pregunta")]
        public string Pregunta { get; set; }

        [BsonElement("Respuesta")]
        public string Respuesta { get; set; }

        [BsonElement("Telefono")]
        public string Telefono { get; set; }

        [BsonElement("UsuarioId")]
        public string UsuarioId { get; set; }
    }
}
