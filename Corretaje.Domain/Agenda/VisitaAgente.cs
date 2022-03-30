using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain.Agenda
{
    public class VisitaAgente : Visita
    {
        [BsonElement("ProyectoId")]
        public string ProyectoId { get; set; }

        [BsonElement("NombreProyecto")]
        public string NombreProyecto { get; set; }

        [BsonElement("AgenteId")]
        public string AgenteId { get; set; }

        [BsonElement("UsuarioId")]
        public string UsuarioId { get; set; }

        [BsonElement("Apellidos")]
        public string Apellidos { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }

        [BsonElement("Nombre")]
        public string Nombre { get; set; }

        [BsonElement("Rut")]
        public string Rut { get; set; }

        [BsonElement("Telefono")]
        public string Telefono { get; set; }
    }
}