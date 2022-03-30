using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    public class Broker : Entity
    {
        [BsonElement("Nombres")]
        public string Nombres { get; set; }

        [BsonElement("Apellidos")]
        public string Apellidos { get; set; }

        [BsonElement("Rut")]
        public string Rut { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }

        [BsonElement("Telefono")]
        public string Telefono { get; set; }

        [BsonElement("Edad")]
        public int Edad { get; set; }

        [BsonElement("Direccion")]
        public string Direccion { get; set; }

        [BsonElement("DatosBancarios")]
        public DatosBancarios DatosBancarios { get; set; }

        [BsonElement("UsuarioId")]
        public string UsuarioId { get; set; }
    }
}
